import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { HttpClient, HttpClientModule } from '@angular/common/http';

export interface Book {
  id: any;  // Book ID
  _id?: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  price: number;
  genre: string;
  publishedDate: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showReceipt: boolean = false;
  books: Book[] = [
    { 
      id: '1',  // Assigning a unique id
      title: 'The Silent Patient', 
      author: 'Alex Michaelides', 
      description: 'A psychological thriller about a woman who shoots her husband and then refuses to speak.', 
      imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQjQP6N_JygvrTNu6ztCsTo4qR5AfA1d_L-xfTU407q4hxHrntj', 
      price: 15.99, 
      genre: 'Psychological Thriller', 
      publishedDate: '2019-02-05' 
    },
    { 
      id: '2',  
      title: 'The Great Gatsby', 
      author: 'F. Scott Fitzgerald', 
      description: 'A novel about wealth, love, and the American dream in the Jazz Age.', 
      imageUrl: 'https://images.penguinrandomhouse.com/cover/9780593201060', 
      price: 18.50, 
      genre: 'Fiction', 
      publishedDate: '1925'
    },
    { 
      id: '3',  // Assigning a unique id
      title: 'The Midnight Library', 
      author: 'Matt Haig', 
      description: 'A woman finds herself in a library between life and death, exploring the infinite possibilities of her life choices.', 
      imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQzp6C9BQqi5Id_8ZrRGZcuTE_uQmican8T1umgAMVJ2g76fIm8', 
      price: 20.00, 
      genre: 'Fantasy, Fiction', 
      publishedDate: '2020-08-13' 
    },
    { 
      id: '4',  // Assigning a unique id
      title: 'Atomic Habits', 
      author: 'James Clear', 
      description: 'A guide to breaking bad habits and forming good ones using small, incremental changes.', 
      imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTLnsvHfPHw8HXmsYGwbNCyYPgszreWfBblCSMHKVXm50NTe-Ha', 
      price: 25.99, 
      genre: 'Self-help, Non-fiction', 
      publishedDate: '2018-10-16' 
    },
    { 
      id: '5',  // Assigning a unique id
      title: 'The Song of Achilles', 
      author: 'Madeline Miller', 
      description: 'A retelling of the Iliad from the perspective of Patroclus, Achilles\' close companion.', 
      imageUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSwv8zS9I4KeFQCK89cUxJqQYHOkNc8ZywPVa9_PimHPOzKXDXD', 
      price: 17.99, 
      genre: 'Historical Fiction, Romance', 
      publishedDate: '2011-09-20' 
    },
    { 
      id: '6',  // Assigning a unique id
      title: 'Circe', 
      author: 'Madeline Miller', 
      description: 'A modern retelling of the myth of Circe, the enchantress who turns men into pigs.', 
      imageUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQldf_JboBchbATJO8qYdn9zomadZoBt9ik5ads-W7hE6qZCP4z', 
      price: 22.50, 
      genre: 'Fantasy, Mythology', 
      publishedDate: '2018-04-10' 
    },
    { 
      id: '7',  // Assigning a unique id
      title: 'Educated', 
      author: 'Tara Westover', 
      description: 'A memoir of a woman who grows up in a strict and isolated family, eventually escaping to learn about the world outside.', 
      imageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1506026635i/35133922.jpg', 
      price: 19.99, 
      genre: 'Memoir, Non-fiction', 
      publishedDate: '2018-02-20' 
    },
    { 
      id: '8',  // Assigning a unique id
      title: 'The Seven Husbands of Evelyn Hugo', 
      author: 'Taylor Jenkins Reid', 
      description: 'A fictional biography of a reclusive Hollywood star and her seven husbands.', 
      imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQfYHX1c_Kz7SvxVNIwX4xQVQAsznuU-_SQNM8vmejtNBcV7r4s', 
      price: 16.50, 
      genre: 'Historical Fiction, Romance', 
      publishedDate: '2017-06-13' 
    },
    { 
      id: '9',  // Assigning a unique id
      title: 'Big Little Lies', 
      author: 'Liane Moriarty', 
      description: 'A dark comedy about three women whose lives collide after a school trivia night turns deadly.', 
      imageUrl: 'https://cdn.hmv.com/r/w-640/hmv/files/05/0505aa92-a470-4dc2-858d-f4ce73895473.jpg', 
      price: 23.99, 
      genre: 'Drama, Mystery', 
      publishedDate: '2014-07-29' 
    },
    { 
      id: '10',  // Assigning a unique id
      title: 'Normal People', 
      author: 'Sally Rooney', 
      description: 'A love story between two teenagers from a small Irish town as they navigate adulthood.', 
      imageUrl: 'https://mattsviews.wordpress.com/wp-content/uploads/2020/06/mv5bnzmzymringetmdg5oc00ogzmlwfmndktyzrlztfkzmzimjazxkeyxkfqcgdeqxvymte2ote2mze1._v1_uy1200_cr9306301200_al_.jpg?w=538', 
      price: 14.50, 
      genre: 'Romance, Literary Fiction', 
      publishedDate: '2018-08-28' 
    }
  
  ];

  cart: Book[] = [];
  showCart = false;
  showCheckout = false;
  selectedBook: Book | null = null;
  errorMessage: string = '';  // To show error messages

  constructor(private readonly router: Router, private readonly http: HttpClient) {}

  // Add book to the cart
  addToCart(book: Book) {
    if (!this.cart.some(item => item.id === book.id)) {
      this.cart.push(book);
    }
    this.selectedBook = book;
    this.updateCart();  // Update cart with backend after adding book
  }

  // Remove book from the cart
  removeFromCart(book: Book) {
    const index = this.cart.findIndex(item => item.id === book.id);  // Use `id` for comparison
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
    this.updateCart();  // Update cart with backend after removing book
  }

  // Show the receipt after checkout
  checkout() {
    this.showReceipt = true;
    this.showCart = false;
  }

  // Toggle book details in the cart
  toggleDetails(book: Book) {
    if (this.selectedBook === book) {
      this.selectedBook = null;
    } else {
      this.selectedBook = book;
    }
  }

  // Get total price of the books in the cart
  getTotalPrice() {
    return this.cart.reduce((total, book) => total + book.price, 0);
  }

  // Empty the cart
  emptyCart() {
    this.cart = [];
    this.updateCart();  // Ensure backend is updated when cart is emptied
  }

  // Toggle the visibility of the cart
  toggleCart() {
    this.showCart = !this.showCart;
  }

  // Update cart on the back-end
  updateCart() {
    this.http.post<any>('http://localhost:5000/api/cart/update', { cartItems: this.cart })
      .subscribe(
        response => {
          if (response.message === 'Cart updated successfully' || response.message === 'Cart created successfully') {
            console.log('Cart successfully updated:', response.updatedCart);
          } else {
            console.error('Unexpected response:', response);
          }
        },
        error => {
          console.error('Error updating cart:', error);
          this.errorMessage = 'Error updating cart. Please try again later.';
        }
      );
  }

  // Proceed with the checkout by sending the cart to the backend and only sending data to the 'book' collection
  checkoutWithBackend() {
    // Only send the cart data for the books collection
    this.http.post('http://localhost:5000/api/cart/checkout', { cart: this.cart })
      .subscribe(
        response => {
          console.log('Checkout successful:', response);
          this.showReceipt = true;
          this.showCart = false;
          this.emptyCart();  // Empty the cart after successful checkout
        },
        error => {
          console.error('Error during checkout:', error);
          this.errorMessage = 'Error during checkout. Please try again later.';
        }
      );
  }
}
