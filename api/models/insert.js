'use strict';

import q from 'q';

import { Text, Language, Test } from './';

q().then(() => {
  return q.all([
    Language.sync(),
    Text.sync(),
    Test.sync()
  ]);
})
.then(() => {
  return Language.bulkCreate([
    { id: 1, name: 'JAVASCRIPT', img: 'javascript.svg' },
    { id: 2, name: 'PYTHON', img: 'python.svg' },
    { id: 3, name: 'RUBY', img: 'ruby.svg' },
    { id: 4, name: 'CSS', img: 'css.svg' },
    { id: 5, name: 'HTML', img: 'html.svg' },
    { id: 6, name: 'C++', img: 'c++.svg' },
    { id: 7, name: 'C', img: 'c.svg' }
  ]);
})
.then(() => {
  return Text.bulkCreate([
    { data: 'export default function () {\n  return \'coucou j\';\n}', languageId: 1 },
    { data: 'try:\n    import Tkinter as Tk\nexcept:\n    import tkinter as Tk #Pour les versions 3.X\nroot = Tk.Tk("hello world")\nlbl = Tk.Label(root, text="Hello world")\nlbl.pack()\nroot.mainloop()\n', languageId: 2 },
    { data: 'render :text => "Hello, world!"', languageId: 3 },
    { data: '.hello-world {\n  content: \'Hello world.\';\n}\n', languageId: 4 },
    { data: '<html lang="fr">\n  <head>\n    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">\n    <title>Hello world !</title>\n  </head>\n  <body>\n    <p>Hello World !</p>\n  </body>\n</html>\n', languageId: 5 },
    { data: '#include <iostream>\n\nint main () {\n  std::cout << "Hello, new world!" << std::endl;\n  return 0;\n}\n', languageId: 6 },
    { data: '#include <unistd.h>\n\nint main (void) {\n  write(1, "Hello World!", 12);\n  return 0;\n}\n', languageId: 7 }
  ]);
})
.then(() => { process.exit(0); });
