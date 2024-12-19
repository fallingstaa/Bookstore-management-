import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Import Router
import { Book } from '../app.component';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  bookTitle: string = '';
  selectedBook: Book | undefined;

  books: Book[] = [
    {
      title: 'The Silent Patient', author: 'Alex Michaelides', description: 'A psychological thriller...', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQjQP6N_JygvrTNu6ztCsTo4qR5AfA1d_L-xfTU407q4hxHrntj', price: 15.99,
      id: undefined,
      genre: '',
      publishedDate: ''
    },
    {
      title: 'Where the Crawdads Sing', author: 'Delia Owens', description: 'A mystery and coming-of-age novel...', imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSf_ydvySipeQJOresLtcs412Ps9INqfpJ8D-aPZoljFGc4FIG03m5sH9joM1BLZtsHOqei', price: 18.50,
      id: undefined,
      genre: '',
      publishedDate: ''
    },
    {
      title: 'The Midnight Library', author: 'Matt Haig', description: 'A woman finds herself in a library...', imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQzp6C9BQqi5Id_8ZrRGZcuTE_uQmican8T1umgAMVJ2g76fIm8', price: 20.00,
      id: undefined,
      genre: '',
      publishedDate: ''
    },
  ];

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

  ngOnInit(): void {
    this.bookTitle = this.route.snapshot.paramMap.get('title') || '';

    // Find the selected book based on the title
    this.selectedBook = this.books.find(book => book.title === this.bookTitle);

    if (!this.selectedBook) {
      // Redirect to home page if no book is found
      this.router.navigate(['/']);
    }
  }
}
