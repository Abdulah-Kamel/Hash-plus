import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../assets/logo.svg";
import googlePlay from "../../assets/google-play.png";
import appStore from "../../assets/app-store.png";

const FooterBrand = ({ brand, appDownload }) => {
  return (
    <div className="space-y-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image src={logo} alt="Hash Plus Logo" className="h-12 w-auto" width={48} height={48} />
      </div>
      
      {/* Tagline */}
      <p className="text-gray-600 leading-relaxed max-w-xs">
        {brand.tagline}
      </p>
      
      {/* App Download Buttons */}
      <div className="flex gap-3">
        <Link href={appDownload.googlePlay} className="block">
          <Image src={googlePlay} alt="Get it on Google Play" className="h-12 w-auto" width={162} height={48} />
        </Link>
        <Link href={appDownload.appStore} className="block">
          <Image src={appStore} alt="Download on App Store" className="h-12 w-auto" width={144} height={48} />
        </Link>
      </div>
    </div>
  );
};

export default FooterBrand;
