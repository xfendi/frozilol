import { useContext } from "react";

const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState({});
  const [projectId, setProjectId] = useState();
  const [profile, setProfile] = useState({});
  const [subscription, setSubscription] = useState({});

  const { user } = UserAuth();
  const userId = user?.uid;

  const updateProjectId = (newProjectId) => {
    setProjectId(newProjectId);
    Cookies.set("projectId", newProjectId, { path: "/" });
  };

  const removeProject = () => {
    setProjectId("");
    setSelectedProject({});
    setSubscription({});
    Cookies.remove("projectId");
    Cookies.remove("selectedProject");
    Cookies.remove("subscription");
  };

  const removeUser = () => {
    setProjects([]);
    Cookies.remove("projects");
    Cookies.remove("profile");
    removeProject();
  };

  useEffect(() => {
    if (!userId) return;

    const storedProjectId = Cookies.get("projectId");

    if (storedProjectId) {
      setProjectId(storedProjectId);
    }

    const projectsRef = collection(db, "projects");
    const unsubscribeProjects = onSnapshot(projectsRef, (querySnapshot) => {
      const userProjects = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.members && data.members[userId]) {
          userProjects.push({ id: doc.id, ...data });
        }
      });

      setProjects(userProjects);
      Cookies.set("projects", JSON.stringify(userProjects), { path: "/" });
      console.log(userProjects);
    });

    const profileRef = doc(db, "profiles", userId);
    const unsubscribeProfile = onSnapshot(profileRef, (docSnap) => {
      if (docSnap.exists()) {
        setProfile({ ...docSnap.data() });
        Cookies.set("profile", JSON.stringify(docSnap.data()), { path: "/" });
        console.log(docSnap.data());
      }
    });

    return () => {
      unsubscribeProjects();
      unsubscribeProfile();
    };
  }, [userId]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) removeUser();
    });
  }, []);

  useEffect(() => {
    if (!projectId) return;

    const projectRef = doc(db, "projects", projectId);
    const unsubscribeProject = onSnapshot(projectRef, (docSnap) => {
      if (docSnap.exists()) {
        setSelectedProject(docSnap.data());
        Cookies.set("selectedProject", JSON.stringify(docSnap.data()), {
          path: "/",
        });
        console.log(docSnap.data());
      } else {
        removeProject();
      }
    });

    const subscriptionRef = ref(
      database,
      "projects/" + projectId + "/subscription"
    );
    const unsubscribeSubscription = onValue(subscriptionRef, (snapshot) => {
      if (snapshot.exists()) {
        setSubscription(snapshot.val());
        Cookies.set("subscription", JSON.stringify(snapshot.val()), {
          path: "/",
        });
        console.log(snapshot.val());
      }
    });

    return () => {
      unsubscribeProject();
      unsubscribeSubscription();
    };
  }, [projectId]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        projects,
        subscription,
        selectedProject,
        projectId,
        updateProjectId,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const ProfileData = () => {
  const context = useContext(ProdileContext);

  if (!context) {
    throw new Error(
      "ProfileData must be used within an ProfileContextProvider"
    );
  }

  return context;
};
