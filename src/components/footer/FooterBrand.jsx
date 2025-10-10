import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../assets/logo.svg";
import googlePlay from "../../assets/google-play.png";
import appStore from "../../assets/app-store.png";

const FooterBrand = ({ brand, appDownload }) => {
  return (
    <div className="space-y-6 text-center md:text-right">
      {/* Logo */}
      <div className="flex items-center gap-3 justify-center md:justify-start">
        <Image src={logo} alt="Hash Plus Logo" className="h-12 w-auto" width={48} height={48} />
      </div>
      
      {/* Tagline */}
      <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto md:mx-0">
        {brand.tagline}
      </p>
      
      {/* App Download Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
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
