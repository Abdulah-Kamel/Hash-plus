import { cookies } from 'next/headers'

const OtpUserEmail = async ({userEmail}) => {
    return (
        <p className="mt-2">{userEmail}</p>
    );
};

export default OtpUserEmail;