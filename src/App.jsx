import { useMemo, useState } from 'react';

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner'];

const dishes = [
  {
    name: 'Berry Pancake Stack',
    category: 'Breakfast',
    description: 'Fluffy pancakes, berries & maple syrup',
    price: '$12',
    image:
      'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=720&q=85',
  },
  {
    name: 'Avocado Toast',
    category: 'Breakfast',
    description: 'Sourdough, smashed avocado & herbs',
    price: '$10',
    image:
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=720&q=85',
  },
  {
    name: 'Sunrise Smoothie Bowl',
    category: 'Breakfast',
    description: 'Açaí, banana, granola & fresh fruit',
    price: '$11',
    image:
      'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=720&q=85',
  },
  {
    name: 'Garden Salad',
    category: 'Lunch',
    description: 'Seasonal greens, tomato & house dressing',
    price: '$14',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=720&q=85',
  },
  {
    name: 'Grilled Chicken Bowl',
    category: 'Lunch',
    description: 'Herb chicken, greens & roasted vegetables',
    price: '$17',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=720&q=85',
  },
  {
    name: 'Creamy Tomato Pasta',
    category: 'Lunch',
    description: 'Fresh pasta, slow-roasted tomato & basil',
    price: '$16',
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=720&q=85',
  },
  {
    name: 'Classic Cheeseburger',
    category: 'Dinner',
    description: 'Grilled beef, aged cheddar & crisp lettuce',
    price: '$19',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=720&q=85',
  },
  {
    name: 'Sizzling Steak',
    category: 'Dinner',
    description: 'Tender grilled steak with seasonal sides',
    price: '$26',
    image:
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=720&q=85',
  },
  {
    name: 'Wood-fired Pizza',
    category: 'Dinner',
    description: 'Tomato, mozzarella & garden-fresh basil',
    price: '$18',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=720&q=85',
  },
];

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const visibleDishes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return dishes.filter((dish) => {
      const matchesCategory =
        activeCategory === 'All' || dish.category === activeCategory;
      const matchesSearch =
        !query ||
        `${dish.name} ${dish.description} ${dish.category}`
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="page">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Foody Zone home">
          <span className="brand-mark" aria-hidden="true">
            f<span>.</span>
          </span>
          <span>Foody <strong>Zone</strong></span>
        </a>
        <label className="search-box">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="search food"
            aria-label="Search food"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </label>
      </header>

      <section className="menu" aria-label="Food menu">
        <div className="intro">
          <p className="eyebrow">GOOD FOOD, GOOD MOOD</p>
          <h1>Find your <span>flavor.</span></h1>
          <p className="intro-copy">
            Freshly made favorites, ready for whatever you&apos;re craving.
          </p>
        </div>

        <nav className="filters" aria-label="Filter dishes by meal">
          {categories.map((category) => (
            <button
              className={`filter-button${activeCategory === category ? ' active' : ''}`}
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </nav>

        {visibleDishes.length > 0 ? (
          <div className="dish-grid">
            {visibleDishes.map((dish, index) => (
              <article className="dish-card" key={dish.name}>
                <div className="dish-photo-wrap">
                  <img
                    className="dish-photo"
                    src={dish.image}
                    alt={dish.name}
                    loading={index > 2 ? 'lazy' : 'eager'}
                  />
                  <span className="dish-price">{dish.price}</span>
                </div>
                <div className="dish-info">
                  <span className="dish-category">{dish.category}</span>
                  <h2>{dish.name}</h2>
                  <p>{dish.description}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state" role="status">
            <span aria-hidden="true">🍽️</span>
            <h2>No dishes found</h2>
            <p>Try another search or choose a different meal category.</p>
          </div>
        )}
        <footer className="page-footer">
          <span className="footer-dot" /> Made fresh, served with love
        </footer>
      </section>
    </main>
  );
}

export default App;
