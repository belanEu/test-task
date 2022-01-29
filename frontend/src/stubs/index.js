export const getTabs = () => {
  return {
    toread: 'To read',
    inprogress: 'In progress',
    done: 'Done'
  } 
};

export const getNextActions = () => {
  return {
      toread: { status: 'inprogress', label: 'start reading' },
      inprogress: { status: 'done', label: 'finish reading' },
      done: { status: 'toread', label: 'return in «to read»' },
  };
};
