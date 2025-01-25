import { BrowserRouter, Routes, Route } from 'react-router';

import MainLayout from './components/layout-related/MainLayout';
import LoginPage from './pages/LoginPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import ConnectionsPage from './pages/ConnectionsPage';
import RequestsPage from './pages/RequestsPage';

function App() {
	return (
		<BrowserRouter basename='/'>
			<Routes>
				<Route element={<MainLayout />}>
					<Route index element={<FeedPage />} />
					<Route path='login' element={<LoginPage />} />
					<Route path='profile' element={<ProfilePage />} />
					<Route path='connections' element={<ConnectionsPage />} />
					<Route path='requests' element={<RequestsPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
