import React from 'react';

import type { FC } from 'react';
import type { User } from '../types/auth';

const Profile: FC<{ user: User }> = ({ user: { photoURL, displayName } }) => {
  return (
    <div className="flex items-center shrink-0">
      <img
        src={photoURL ?? undefined}
        alt="user_avatar"
        className="w-6 h-6 md:w-8 md:h-8 rounded-full md:mr-2"
      ></img>
      <span className="hidden md:inline font-serif font-medium">
        {displayName}
      </span>
    </div>
  );
};

export default Profile;
