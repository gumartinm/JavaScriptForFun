" *************************** Code-analysis engine for JavaScript ***************************

"http://ternjs.net/
filetype plugin indent on
"let g:tern#command = ["node", '~/.vim/bundle/tern_for_vim/autoload' . '/../node_modules/tern/bin/tern', '--persistent']
"Hay que buscar algo mejor: node ~/.vim/bundle/tern_for_vim/node_modules/tern/bin/tern --persistent --verbose
let g:tern#command = ["nothing"]
let g:tern_request_timeout = 10

"https://github.com/marijnh/tern_for_vim
let g:tern_show_argument_hints='on_hold'
let g:tern_map_keys=1




" *************************** https://github.com/burnettk/vim-angular ***************************


"https://github.com/othree/javascript-libraries-syntax.vim
let g:used_javascript_libs = 'angularjs,angularui,jasmine,jquery'

"https://github.com/pangloss/vim-javascript
set regexpengine=1

"https://github.com/scrooloose/syntastic
let oldstatusline=&statusline       "save current configuration
set statusline=
set statusline+=%#WarningMsg#       "switch to 'WarningMsg' default theme color. See available colors with command :highlight
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*
let &statusline.=oldstatusline      "concatenate configuration
unlet oldstatusline
let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0
"http://jshint.com
let g:syntastic_javascript_checkers = ['jshint', 'jscs']


" *************************** Line numbers ***************************
set number


" *************************** Because broken editors are being used by some naïve developers ***************************
" set binary
" set noeol


" *************************** Save session on quitting Vim ***************************
autocmd VimLeave * NERDTreeClose
autocmd VimLeave * call MakeSession()

" *************************** Restore session on starting Vim ***************************
" autocmd VimEnter * call MySessionRestoreFunction()
autocmd VimEnter * call LoadSession()
autocmd VimEnter * NERDTree

function! MakeSession()
  let b:sessiondir = $HOME . "/.vim/sessions" . getcwd()
  if (filewritable(b:sessiondir) != 2)
    exe 'silent !mkdir -p ' b:sessiondir
    redraw!
  endif
  let b:filename = b:sessiondir . '/session.vim'
  exe "mksession! " . b:filename
endfunction

function! LoadSession()
  let b:sessiondir = $HOME . "/.vim/sessions" . getcwd()
  let b:sessionfile = b:sessiondir . "/session.vim"
  if (filereadable(b:sessionfile))
    exe 'source ' b:sessionfile
  else
    echo "No session loaded."
  endif
endfunction

map <lt>r :NERDTreeFind<cr>


" *************************** Indentation ***************************
set tabstop=2
set shiftwidth=2
set expandtab


" *************************** Spelling ***************************
"Corrección ortográfica. En consola :setlocal spell spelllang=es
"Los diccionarios en español hay que bajárselos de aquí: http://ftp.vim.org/vim/runtime/spell/
"y dejarlos en esta ruta: /usr/share/vim/vim72/spell
"Ver http://plagatux.es/2008/12/correcion-ortografica-en-vim/
"si queremos tener un fichero donde se vayan agregando las palabras que no sean reconocidas
set spellfile=~/.vim/dict.add
"Para habilitarlo siempre:
"runtime plugins/spellfile.vim <----- Esto no parece necesario :(
"setlocal spell spelllang=es
setlocal spell spelllang=en
"    * ]s – Siguiente falta ortográfica
"    * [s - Anterior falta ortográfica
"    * z= - Mostrar sugerencias para una palabra incorrecta.
"    * zg - Añadir una palabra al diccionario.
"    * zug - Deshacer la adición de una palabra al diccionario.
"    * zw - Eliminar una palabra del diccionario.
"set nospell para deshabilitarlo
