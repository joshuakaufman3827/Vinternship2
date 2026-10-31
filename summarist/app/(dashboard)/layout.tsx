import DashboardShell from '../components/DashboardShell';

// Every page inside the (dashboard) folder gets the sidebar and search bar.
// The folder name in parentheses does not appear in the URL.
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
