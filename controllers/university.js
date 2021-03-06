const University = require('../models/university');
const logger = require('../config/logger');

/**
 * @apiDefine University University
 * Developed by Yashodhan
 */

/**
 * @apiGroup University
 * @api {POST} /api/university Create new University profile
 * @apiDescription Creates a new University profile
 * @apiPermission Admin
 * @apiParam {string} name - Display name for tag
 * @apiParam {string} description - Description for the university
 * @apiParam {string} address - Address of the university
 * @apiParam {Object[]} [contacts] - Array of contacts for the university.Each member has : type : String : type of contact, value : String : actual contact
 * @apiParam {Number} [avg_gre] - average GRE score required for the acceptance, default value is NAN
 * @apiParam {Number} [avg_lang] - average score on language test (TOFEL/ILETS) required for the acceptance, default value is NAN
 * @apiParam {Number} [fees] - Fees of the university, default value is NAN
 * @apiSuccess (201) {ObjectId} _id - Object Id, internally generated by MongoDB
 * @apiSuccess (201) {string} name - Display name for university
 * @apiSuccess (201) {string} slug - A compressed version of name, in development
 * @apiSuccess (201) {string} description - Description for the university
 * @apiSuccess (201) {string} address - Address of the university
 * @apiSuccess (201) {Object[]} contact - Array of contacts for the university.
 * @apiSuccess (201) {Number} avg_gre - average GRE score required for the acceptance, default value is NAN
 * @apiSuccess (201) {Number} avg_lang - average score on language test (TOFEL/ILETS) required for the acceptance, default value is NAN
 * @apiSuccess (201) {Number} fees - Fees of the university, default value is NAN
 */
exports.create = async (req, res) => {
  const doc = await University.create(req.body);
  logger.created('University', doc);
  return res.status(201).json(doc);
};
/**
 * @apiGroup University
 * @api {GET} /api/university Get all University
 * @apiDescription Get all University profiles in database
 * @apiPermission None
 * @apiSuccess (200) {University[]} no_field Array of universities, where each university contains :
 * @apiSuccess (200) {ObjectId} _id - Object Id, internally generated by MongoDB
 * @apiSuccess (200) {string} name - Display name for university
 * @apiSuccess (200) {string} slug - A compressed version of name, in development
 * @apiSuccess (200) {string} description - Description for the university
 * @apiSuccess (200) {string} address - Address of the university
 * @apiSuccess (200) {Object[]} contacts - Array of contacts for the university.
 * @apiSuccess (200) {Number} avg_gre - average GRE score required for the acceptance
 * @apiSuccess (200) {Number} avg_lang - average score on language test (TOFEL/ILETS) required for the acceptance
 * @apiSuccess (200) {Number} fees - Fees of the university
 */
exports.getAll = async (req, res) => {
  const searchQuery = req.query;
  const docs = await University.find(searchQuery);
  if (!docs) {
    return res.status(404).json({
      msg: 'No documents found',
    });
  }

  logger.readMany('University', docs);
  return res.json(docs);
};

/**
 * @apiGroup University
 * @api {GET} /api/university/:slug Get a University by slug
 * @apiDescription Get University by its slug
 * @apiPermission None
 * @apiSuccess (200) {ObjectId} _id - Object Id, internally generated by MongoDB
 * @apiSuccess (200) {string} name - Display name for university
 * @apiSuccess (200) {string} slug - A compressed version of name, in development
 * @apiSuccess (200) {string} description - Description for the university
 * @apiSuccess (200) {string} address - Address of the university
 * @apiSuccess (200) {Object[]} contacts - Array of contacts for the university.
 * @apiSuccess (200) {Number} avg_gre - average GRE score required for the acceptance
 * @apiSuccess (200) {Number} avg_lang - average score on language test (TOFEL/ILETS) required for the acceptance
 * @apiSuccess (200) {Number} fees - Fees of the university
 *
 */
exports.getBySlug = async (req, res) => {
  const { slug } = req.params;
  const doc = await University.findOne({ slug });
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found',
    });
  }

  logger.readOne('University', doc);
  return res.json(doc);
};

/**
 * @apiGroup University
 * @api {PUT} /api/university/:slug Update a University
 * @apiDescription Update University by its slug
 * @apiPermission Admin
 * @apiParam {string} [name] - Display name for tag
 * @apiParam {string} [description] - Description for the university
 * @apiParam {string} [address] - Address of the university
 * @apiParam {Object[]} [contacts] - Array of contacts for the university.Each member is : {type - A string denoting type of contact eg : website, phone no. etc. , value : actual contact}
 * @apiParam {Number} [avg_gre] - average GRE score required for the acceptance, default value is NAN
 * @apiParam {Number} [avg_lang] - average score on language test (TOFEL/ILETS) required for the acceptance, default value is NAN
 * @apiParam {Number} [fees] - Fees of the university, default value is NAN
 * @apiSuccess (200) {ObjectId} _id - Object Id, internally generated by MongoDB
 * @apiSuccess (200) {string} name - Display name for university
 * @apiSuccess (200) {string} slug - A compressed version of name, in development
 * @apiSuccess (200) {string} description - Description for the university
 * @apiSuccess (200) {string} address - Address of the university
 * @apiSuccess (200) {Object[]} contacts - Array of contacts for the university.
 * @apiSuccess (200) {Number} avg_gre - average GRE score required for the acceptance
 * @apiSuccess (200) {Number} avg_lang - average score on language test (TOFEL/ILETS) required for the acceptance
 * @apiSuccess (200) {Number} fees - Fees of the university
 */
exports.updateBySlug = async (req, res) => {
  const { slug } = req.params;
  const doc = await University.findOneAndUpdate({ slug }, req.body, { new: true });
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found',
    });
  }
  logger.updated('University', doc);
  return res.json(doc);
};

/**
 * @apiGroup University
 * @api {DELETE} /api/university/:slug Delete University profile by slug
 * @apiDescription Delete a University profile by its slug
 * @apiPermission Admin
 * @apiSuccess (200) {String} msg Contains value "ok"
 */
exports.deleteBySlug = async (req, res) => {
  const { slug } = req.params;
  const doc = await University.findOneAndDelete({ slug });
  if (!doc) {
    return res.status(404).json({
      msg: 'Not found',
    });
  }

  logger.deleted('University', doc);
  return res.json({
    msg: 'ok',
  });
};
