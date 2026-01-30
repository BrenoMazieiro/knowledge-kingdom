import { BrowserRouter, Routes, Route } from 'react-router';
import { Providers } from './providers/index';
import { ErrorBoundary } from './components/molecules/ErrorBoundary';
import { MainLayout } from './components/templates/MainLayout';
import { AuthLayout } from './components/templates/AuthLayout';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { SignInPage } from './pages/SignInPage';
import { DashboardPage } from './pages/DashboardPage';
import { KingdomsPage } from './pages/KingdomsPage';
import { KingdomDetailPage } from './pages/KingdomDetailPage';
import { VillageDetailPage } from './pages/VillageDetailPage';
import { HouseDetailPage } from './pages/HouseDetailPage';
import { UsersPage } from './pages/UsersPage';
import { BadgesPage } from './pages/BadgesPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { BMManagementPage } from './pages/BMManagementPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
  return (
    <ErrorBoundary>
      <Providers>
        <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SignInPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/kingdoms" element={<KingdomsPage />} />
              <Route path="/kingdoms/:kingdomId" element={<KingdomDetailPage />} />
              <Route path="/kingdoms/:kingdomId/villages/:villageId" element={<VillageDetailPage />} />
              <Route path="/kingdoms/:kingdomId/villages/:villageId/houses/:houseId" element={<HouseDetailPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/badges" element={<BadgesPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/managers" element={<BMManagementPage />} />
            </Route>
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </BrowserRouter>
      </Providers>
    </ErrorBoundary>
  );
};
