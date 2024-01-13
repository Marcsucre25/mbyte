import { DataProvider } from "./src/Context/DataContext";
import { AuthProvider } from "./src/Context/AuthContext";
import PrincipalNaigation from "./src/navigations/PrincipalNaigation";

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <PrincipalNaigation />
      </DataProvider>
    </AuthProvider>
  );
}
