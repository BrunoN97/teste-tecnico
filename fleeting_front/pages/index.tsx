import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { AuthProvider } from "../src/context/AuthContext";
import ResponsiveAppBar from "../src/components/appBar/appBar";
import CustomPaginationActionsTable from "../src/components/table/tableToDo";

export default function Home() {
  return (
    <AuthProvider>
      <ResponsiveAppBar />

      <CustomPaginationActionsTable />
    </AuthProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { "fleeting-token": token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
