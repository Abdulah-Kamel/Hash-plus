import { cookies } from 'next/headers'

const OtpUserEmail = async () => {
    const cookie = await cookies();
    const user = JSON.parse(cookie.get("user").value)
    return (
        <p className="mt-2">{user.email}</p>
    );
};

export default OtpUserEmail;