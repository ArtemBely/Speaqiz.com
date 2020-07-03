[
  "@babel/plugin-transform-runtime",
  {
    "absoluteRuntime": false,
    "corejs": false,
    "helpers": true,
    "regenerator": true,
    "useESModules": false,
    "version": "7.0.0-beta.0"
  }
]
https://vast-tundra-39777.herokuapp.com/api/smash
https://speaqiz.com/api/smash
CONNECTION_URI || ;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public_back/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if( file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetipe === 'image/svg') {
    cb(null, true);
  }
  else  { cb(null, false); }
};

const upload = multer({
 storage: storage,
 limits: {
    fileSize:  1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post('/', upload.single('cover'), async (req, res, next) => {
  const fileName = req.file !=null ? req.file.filename : null
  let question = new Question ({
    name: req.body.name,
    first: req.body.first,
    second: req.body.second,
    third: req.body.third,
    right: req.body.right,
    coverImageName: fileName
  });
