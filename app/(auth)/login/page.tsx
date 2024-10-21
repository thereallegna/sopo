import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card/index"
import Image from "next/image"

const LoginPage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen p-32">
            <Card size="login" variant="default">
                <CardHeader className="items-center">
                    <Image
                        src="/images/logo-runsystem.png" 
                        alt="Run System Logo" 
                        className="max-w-[130px] h-auto"
                        width={200}
                        height={200}
                        layout="responsive"
                        quality={100} 
                    />
                </CardHeader>
                <CardTitle className="text-[20px]">
                    Welcome to RUN System
                </CardTitle>
                <CardDescription className="text-[12px]">
                    Enter your credentials to access your account
                </CardDescription>
            </Card>
        </div>
    )
}

export default LoginPage