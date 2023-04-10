class ModelService {
    constructor(query, requestObject) {
        this.QUERY = query;
        this.REQUEST_OBJECT = requestObject;
        this.EXCLUDED_LIST = ['page', 'limit', 'sort', 'fields', 'search'];
    }

    filter() {
        let filterQuery = { ...this.REQUEST_OBJECT };
        this.EXCLUDED_LIST.forEach((list) => {
            delete filterQuery[list];
        });
        filterQuery = JSON.stringify(filterQuery);
        filterQuery = filterQuery.replace(
            /\b(gte|gt|lte|lt|ne)\b/g,
            (match) => `$${match}`
        );
        filterQuery = JSON.parse(filterQuery);

        this.QUERY = this.QUERY.find(filterQuery);
        return this;
    }

    search() {
        // use regex
        //
        let searchQuery = this.REQUEST_OBJECT.search;
        if (searchQuery)
            this.QUERY = this.QUERY.find({
                //use title field
                title: {
                    //use regex for more matching
                    $regex: searchQuery,
                    // i is for case insensetivity
                    //x is for ignoring white space characters
                    $options: 'ix',
                },
            });
        return this;
    }

    sort() {
        let sortQuery = this.REQUEST_OBJECT.sort;
        if (sortQuery) {
            sortQuery = sortQuery.split(',').join(' ');
        } else {
            sortQuery = '-createdAt';
        }
        this.QUERY = this.QUERY.sort(sortQuery);
        return this;
    }

    get() {
        return this.QUERY;
    }
}

module.exports = ModelService;
