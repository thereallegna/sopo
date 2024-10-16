import Image from "next/image"

export default function AuthBackground({ 
    children,
 }: Readonly<{
    children: React.ReactNode;
 }>) {
    return (
        <main className="flex flex-col items-center justify-between min-h-screen relative">
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/background.png" 
                    alt="background image" 
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
            </div>

            <div>
                {children}
            </div>
        </main>
    );
}