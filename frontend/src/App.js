import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';
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
  const [hasMoreBooks, setHasMoreBooks] = useState(true);
  const [isWidgetLoading, setIsWidgetLoading] = useState(true);
  const [isPartLoading, setIsPartLoading] = useState(false);

  const [book, setNextStatus] = useState(defaultBookStatus);

  const currentTab = getTabFromUrl(), tags = getTagsFromUrl();

  const addBooks = () => {
    if (document.body.clientHeight - window.scrollY <= window.innerHeight) {
      setPage(page + 1);
    }
  };

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
      setIsWidgetLoading(true);
      let data;
      if (tags.length > 0) {
        data = await api.getFilteredBooks(currentTab, tags, page);
      } else {
        data = await api.getTabBooks(currentTab, page);
      }
      setIsWidgetLoading(false);
      setBooks(data);
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchAndAddBooks = async () => {
      setIsPartLoading(true);
      let data;
      if (tags.length > 0) {
        data = await api.getFilteredBooks(currentTab, tags, page);
      } else {
        data = await api.getTabBooks(currentTab, page);
      }
      setIsPartLoading(false);
      if (data.length > 0) {
        setBooks(books.concat(data));
      } else {
        setHasMoreBooks(false);
      }
    };

    if (!isWidgetLoading && hasMoreBooks && !isPartLoading) {
      fetchAndAddBooks();
    }
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

  useEffect(() => {
    window.addEventListener('scroll', throttle(() => addBooks(), 500));

    return () => {
      window.removeEventListener('scroll', addBooks());
    };
  }, []);

  return (
    <div className="app">
      {isWidgetLoading ? 'Loading...' :
      <div className="widget">
        <Nav tabs={tabs} chosenTab={currentTab} />
        <BookList books={books} tags={tags}
        handleChangeBookStatus={(id, status) => updateWidgetByChangingBookStatus(id, status)}
        />
        {isPartLoading ? <span style={{padding: "20px"}}>Loading...</span> : ''}
      </div>
      }
    </div>
  );
}

export default App;
