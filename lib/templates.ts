export const templates = {
  user: `{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "isActive": true,
    "roles": ["admin", "editor"],
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "zipCode": "12345"
    },
    "preferences": {
      "theme": "dark",
      "notifications": true,
      "language": "en"
    }
  }
}`,
  product: `{
  "product": {
    "id": "p123",
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones with noise cancellation",
    "price": 99.99,
    "currency": "USD",
    "inStock": true,
    "quantity": 50,
    "categories": ["electronics", "audio", "accessories"],
    "images": [
      {
        "url": "https://example.com/headphones1.jpg",
        "alt": "Front view",
        "isPrimary": true
      },
      {
        "url": "https://example.com/headphones2.jpg",
        "alt": "Side view",
        "isPrimary": false
      }
    ],
    "specs": {
      "brand": "AudioTech",
      "model": "AT-500",
      "color": "black",
      "weight": "250g",
      "wireless": true,
      "batteryLife": "20 hours",
      "connectivity": ["Bluetooth 5.0", "3.5mm jack"]
    },
    "ratings": {
      "average": 4.5,
      "count": 128
    }
  }
}`,
  apiResponse: `{
  "status": "success",
  "code": 200,
  "data": {
    "items": [
      {
        "id": 1,
        "title": "First Item",
        "completed": false,
        "createdAt": "2023-06-15T10:30:00Z"
      },
      {
        "id": 2,
        "title": "Second Item",
        "completed": true,
        "createdAt": "2023-06-14T08:15:30Z"
      },
      {
        "id": 3,
        "title": "Third Item",
        "completed": false,
        "createdAt": "2023-06-13T15:45:20Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "itemsPerPage": 10,
      "totalItems": 42
    }
  },
  "meta": {
    "requestId": "req-123-456-789",
    "processingTimeMs": 45,
    "apiVersion": "v2.1"
  }
}`,
}
