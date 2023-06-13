import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPost from './AddPost';
import BlogList from './BlogList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/pop" element={<AddPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;