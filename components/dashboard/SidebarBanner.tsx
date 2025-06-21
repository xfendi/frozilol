import React from "react";

const SidebarBanner = ({
  title,
  subtitle,
  className,
  content,
}: {
  title: string;
  subtitle: string;
  className?: string;
  content?: React.ReactNode;
}) => {
  return (
    <div className={`sidebar_banner ${className}`}>
      <div className="profile-card_text">
        <p className="profile-card__name">{title}</p>
        <p className="profile-card__id">{subtitle}</p>
      </div>
      {content}
    </div>
  );
};

export default SidebarBanner;
