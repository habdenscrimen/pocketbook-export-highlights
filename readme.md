## Export Pocketbook highlights

Export highlights from your Pocketbook.

1. Start project:
    - via Docker:
      
      `docker run -p 9000:9000 habdenscrimen/export-pocketbook-highlights`

        **or**

    - manually: 
      
      `git clone https://github.com/habdenscrimen/pocketbook-export-highlights.git && cd pocketbook-export-highlights && npm i && npm start`
2. Go to http://localhost:9000.
3. Upload **books.db** file there in accordance with the instructions on the site.
4. Tadam! You can see the list of your highlights.

### Screenshots

| ![welcome page](./screenshots/welcome.png)  |
|---|
| ![list page](./screenshots/list.png)  |

### TODO

- [x] See the list of highlights.
- [x] Copy highlight by click.
- [x] Sort highlights by author and book name.
- [x] Add the ability to run the app via Docker.
