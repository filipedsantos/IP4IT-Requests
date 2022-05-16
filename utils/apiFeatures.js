// helper class to implement MongoDB filter, sort, limitFields and pagination
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|le)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // sort('price,ratingsAverage') -> postman query (separated by ,)
      // sort('price ratingsAverage') -> mongoose query
      const sortBy = this.queryString.sort.split(','.join(' '));
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fileds) {
      const fields = this.queryString.fields.split(',').join(' ');
      // query.selected -> it's called query projection
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    // * 1 convert string to Number || defining default value 1
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    // page=2&limit=10, 1-10, page 1, 11-20, page 2
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
