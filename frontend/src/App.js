import { useState, useEffect } from 'react';
import './App.sass';
import { Widget } from './components/Widget/Widget';
import { api } from './api';
import { getTabFromUrl, getTagsFromUrl } from './utils';

function App() {
  const [tabs, setTabs] = useState([]);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const currentTab = getTabFromUrl(), tags = getTagsFromUrl();

  useEffect(() => {
    const fetchTabs = async () => {
      const data = await api.getStatusCounters();
      setTabs(data);
    };

    fetchTabs();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      const data = await api.getTabBooks(currentTab, page);
      setIsLoading(false);
      setBooks(data);
    };
    const fetchFilteredBooks = async () => {
      console.log('fetch filtered books');
      setIsLoading(true);
      const data = await api.getFilteredBooks(currentTab, tags, page);
      setIsLoading(false);
      setBooks(data);
    };
    const fetchData = () => {
      if (tags.length > 0) {
        fetchFilteredBooks();
      } else {
        fetchBooks();
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    
  }, [page]);

  return (
    <div className="app">
      {isLoading ? 'Loading ...' : <Widget tabs={tabs} books={books} tags={tags} />}
    </div>
  );
}

export default App;
