import Header from "./Header";

const Layout = ({
    children,
    showCurrentUser = true
}: Readonly<{
    children: React.ReactNode;
    showCurrentUser?: boolean;
}>) => {
    return (
        <>
          <Header showCurrentUser={showCurrentUser} />
          <main className="container mx-auto px-4 py-6">
            {children}
          </main>
        </>
    );
}

export default Layout;