export default function SignLayout({ children }: React.PropsWithChildren) {
    return (
        <div className="relative z-10 flex min-h-full flex-1 items-center justify-center px-4 py-10 sm:px-8">
            {children}
        </div>
    );
}
