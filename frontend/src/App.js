import { useState, useEffect } from 'react';
import './App.sass';
import { Nav } from './components/Nav/Nav';
import { BookList } from './components/BookList/BookList';
import { api } from './api';
import { getTabFromUrl, getTagsFromUrl } from './utils';

const defaultBookStatus = {id: -1, status: 'none'};

function App() {
  const [tabs, setTabs] = useState([]);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [book, setNextStatus] = useState(defaultBookStatus);

  const currentTab = getTabFromUrl(), tags = getTagsFromUrl();

  const updateWidgetByChangingBookStatus = (bookId, status) => {
    const index = books.findIndex(item => item.id === bookId);
    books.splice(index, 1);

    const nextTab = tabs.find(item => item.id === status),
    currTab = tabs.find(item => item.id === currentTab);
    nextTab.count++;
    currTab.count--;
    
    setNextStatus({id: bookId, status});
    setTabs(tabs);
    setBooks(books);
  };

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
    const changeBookStatus = async () => {
      if (book.id !== defaultBookStatus.id) {
        const res = await api.changeBookStatus(book.id, book.status);
        if (!res) {
          alert("Не удалось изменить статус книги! Просим связаться с тех. поддержкой");
        }
      }
    };

    changeBookStatus();
  }, [book.id]);

  return (
    <div className="app">
      {isLoading ? 'Loading ...' :
      <div className="widget">
        <Nav tabs={tabs} chosenTab={currentTab} />
        <BookList books={books} tags={tags}
        handleChangeBookStatus={(id, status) => updateWidgetByChangingBookStatus(id, status)}
        />
      </div>
      }
    </div>
  );
}

export default App;
