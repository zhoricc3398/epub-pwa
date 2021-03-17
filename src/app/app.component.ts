import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as epubjs from '../../node_modules/epubjs/dist/epub.min.js';
import { DataService } from './core/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  //
  book = null;

  //
  width = 600;
  height = 600;

  //
  Rendition;

  //
  subscription: Subscription = new Subscription();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.load();
  }

  //
  load(): void {
    //
    const url: string =
      'https://zhoricc3398.github.io/ugt-csp/assets/doyle-hound-of-the-baskervilles.epub';

    //
    this.subscription.add(
      this.dataService.getData(url).subscribe(
        (x) => {
          console.log(x, '--------------------------');

          let firstFile = x;

          if (window.FileReader) {
            let reader: FileReader = new FileReader();

            reader.onload = (e) => {
              // console.log(e);
              this.book = epubjs(firstFile);
              this.Rendition = this.book.renderTo('area');
              //getting cover
              // this.book.coverUrl().then((result) => {
              // document.getElementById('cover').setAttribute('src', result);
              // });
              this.Rendition.display();
              /* Replace area with the id for your div to put the book in */
            };

            reader.readAsArrayBuffer(firstFile);

            reader.onloadend = (e) => {
              // console.log(book);
            };
          } else {
            alert(
              'Your browser does not support the required features. Please use a modern browser such as Google Chrome, or Mozilla Firefox'
            );
          }
          // });
        },
        (error) => {
          console.log(error, '-------------------------*');

          // var test = new Blob(error.error.text);
          // console.log(test);
        }
      )
    );

    // next page
    document.getElementById('nextPage').addEventListener('click', () => {
      // next page
      this.Rendition.next();
    });

    // prev page
    document.getElementById('prevPage').addEventListener('click', () => {
      // prev page
      this.Rendition.prev();
    });
  }
}
