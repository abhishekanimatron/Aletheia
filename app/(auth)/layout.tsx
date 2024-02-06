import { Logo } from "./_components/logo";

//componet to show auth option 
const AuthLayout = ({
    children
}: {
    children: React.ReactNode;
    // In ReactJS with TypeScript, ReactNode is a type that represents a React element, an array of React elements, or a string, number, or boolean.
}) => {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-6">
            <Logo />
            {children}
        </div>
    )
}
export default AuthLayout