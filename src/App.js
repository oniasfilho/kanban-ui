import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import Layout from './component/Layout';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
	const theme = useSelector((state) => state.theme.theme);

	useEffect(() => {
		const root = window.document.documentElement;

		if (theme === 'dark') {
			root.style.setProperty('--background-color', '#2B2C37');
			root.style.setProperty('--text-color', 'white');
			root.style.setProperty('--secondary-color', '#20212C');
		} else {
			root.style.setProperty('--background-color', '#FFFFFF');
			root.style.setProperty('--text-color', 'black');
			root.style.setProperty('--secondary-color', '#F4F7FD');
		}
	}, [theme])

	return (
		<BrowserRouter>
			<Routes>
				<Route path={"/home"} element={<Layout />} >
					<Route path='boards' element={<Home />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
