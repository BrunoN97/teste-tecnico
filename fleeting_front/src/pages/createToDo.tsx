import { AuthProvider } from "../context/AuthContext";
import ResponsiveAppBar from "../components/appBar/appBar";
import CustomPaginationActionsTable from "../components/table/tableToDo";

export default function CreateToDo() {
  return (
    <div>
      <AuthProvider>
        <ResponsiveAppBar />

        <CustomPaginationActionsTable />
      </AuthProvider>
    </div>
  );
}
