import React, { useState, useEffect } from 'react';

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=Clearwater,FL,US&units=imperial&appid=8bcf01b419bf1dd16a4c2958c8d25f35`
        );
        
        if (!response.ok) throw new Error('Weather data not available');
        setWeather(await response.json());
      } catch (err) {
        setError('Failed to load weather');
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error || !weather) return <div>{error || 'No data'}</div>;

  // Group by day
  const daily = {};
  weather.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!daily[date]) {
      daily[date] = { temps: [], icons: [], descs: [], humidity: [] };
    }
    daily[date].temps.push(item.main.temp);
    daily[date].icons.push(item.weather[0].icon);
    daily[date].descs.push(item.weather[0].description);
    daily[date].humidity.push(item.main.humidity);
  });

  // Process each day
  const forecast = Object.entries(daily).slice(0, 5).map(([date, day]) => {
    const getMostCommon = arr => {
      const count = {};
      arr.forEach(item => count[item] = (count[item] || 0) + 1);
      return Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
    };

    return {
      date,
      high: Math.round(Math.max(...day.temps)),
      low: Math.round(Math.min(...day.temps)),
      description: getMostCommon(day.descs),
      icon: getMostCommon(day.icons),
      humidity: Math.round(day.humidity.reduce((a, b) => a + b) / day.humidity.length)
    };
  });

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T12:00:00');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dateOnly = date.toDateString();
    const todayOnly = today.toDateString();
    const tomorrowOnly = tomorrow.toDateString();
    
    if (dateOnly === todayOnly) return 'Today';
    if (dateOnly === tomorrowOnly) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
      <h3 style={{ textAlign: 'center' }}>5-Day Forecast for Clearwater</h3>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
        {forecast.map((day, i) => (
          <div key={i} style={{ 
            backgroundColor: 'white', 
            padding: '10px', 
            borderRadius: '8px',
            minWidth: '120px',
            textAlign: 'center'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              {formatDate(day.date)}
            </div>
            
            <img 
              src={`https://openweathermap.org/img/wn/${day.icon.replace('n', 'd')}@2x.png`}
              alt={day.description}
              style={{ width: '60px', height: '60px' }}
            />
            
            <div style={{ margin: '5px 0', textTransform: 'capitalize' }}>
              {day.description}
            </div>
            
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              <span style={{ color: '#e74c3c' }}>{day.high}°</span>
              <span style={{ color: '#888', margin: '0 3px' }}>/</span>
              <span style={{ color: '#3498db' }}>{day.low}°F</span>
            </div>
            
            <div style={{ fontSize: '12px', color: '#666' }}>
              Humidity: {day.humidity}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}