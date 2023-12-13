const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4500/api/data');
      const data = await response.json();
      console.log(data)
      // Process data and update state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  