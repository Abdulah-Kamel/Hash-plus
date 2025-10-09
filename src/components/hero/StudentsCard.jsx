import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const StudentsCard = ({ profiles }) => {
  return (
    <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl ring-1 ring-black/5 p-4 w-53 backdrop-blur">
      <div className="flex flex-col items-center gap-3">
        {/* avatars */}
        <div className="flex -space-x-2 rtl:space-x flex-row-reverse">
          {profiles.map((profile) => (
            <Image
              key={profile.id}
              className="w-10 h-10 border-2 border-white rounded-full"
              src={profile.src}
              alt={profile.alt}
              width={40}
              height={40}
            />
          ))}
          <Link
            className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
            href="#"
          >
            +99
          </Link>
        </div>

        <div className="text-sm text-qusecondary leading-5">
          أكثر من +500 طالب اشترك معنا من جميع أنحاء العالم
        </div>
      </div>
    </div>
  );
};

export default StudentsCard;
