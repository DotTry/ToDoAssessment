var Header = React.createClass({ //header will have add, back button and title of page.
    render: function () {
        return (
            <header className="bar bar-nav header">
                <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
                <a href="#add" className={"icon icon-compose pull-right" + (this.props.back==="false"?"":" hidden")}></a>
                <h1 className="title">{this.props.text}</h1>
            </header>
        );
    }
});


var ItemListItem = React.createClass({ //individual list items. Will show text and direct router to it's edit page
    render: function () {
        return (
            <li className="table-view-cell media btn-1 ">
                <a href={"#items/" + this.props.item.id}>
                    <p >{this.props.item.title}</p>
                </a>
            </li>
        );
    }
});

var ItemList = React.createClass({ //map the list items
    render: function () {
        var items = this.props.items.map(function (item) {
            return (
                <ItemListItem key={item.id} item={item} />
            );
        });
        return (
            <ul  className="table-view">
                {items}
            </ul>
        );
    }
});

var HomePage = React.createClass({ //take cache everytime we enter homepage, editpage, and addpage to return after exiting.
    render: function () {
      localStorage.setItem("lastPage", " ");
        return (
            <div className={"page " + this.props.position}>
                <Header text="ToDo List" back="false"/>
                {/*<!<SearchBar searchKey={this.props.searchKey} searchHandler={this.props.searchHandler}/>*/}
                <div className="content">
                    <ItemList className="list-item" items={this.props.items}/>
                </div>
            </div>
        );
    }
});

var ItemPage = React.createClass({
    getInitialState: function() {
        return {item: {}, inputValue: ''};
    },
    componentDidMount: function() {
        this.props.service.findById(this.props.itemId).done(function(result) { //Bind data from data.js to the frontend
            this.setState({item: result});
            console.log("result" + result);
            this.setState({inputValue: result.title});
        }.bind(this));
    },
    removeTodo: function(input){
      this.props.service.removeById(this.props.itemId).done(function(result) {
          this.setState({item: {}});
      }.bind(this));
      router.load(" ");
    },
    updateInput: function(input){ //after every change in textfield, we want to document it. Just in case user leaves.
      this.setState({
        inputValue: input.target.value
      });
      this.props.service.editById(this.props.itemId, input.target.value).done(function(result) { //We will change the text of variable everytime textfield change
          this.setState({item: result});
      }.bind(this));
    },
    render: function () {
      localStorage.setItem('lastPage', "items/" + this.props.itemId);
        return (
            <div className={"page " + this.props.position}>
                <Header text="Edit" back="true"/>
                <div className="card ">
                    <ul className="table-view">

                        <div className="bar bar-standard">
                            <input type="text" value={this.state.inputValue} onChange={this.updateInput}  />
                            <a class="input btn-5"> <input className="input-add" type="submit" value="Delete" href="#" onClick={this.removeTodo}/> </a>
                        </div>
                    </ul>
                </div>
            </div>
        );
    }
});

var AddPage = React.createClass({
    getInitialState: function() {
        return {item: {}, continueAddText: itemService.continueAddText};
    },
    addTodo: function(){
      if(this.state.continueAddText){ //test if empty input, else do nothing
        itemService.addItem(this.state.continueAddText);
        this.setState({
          continueAddText: ' '
        });
        //this.state.edit = false; //Prevents random text capture when we exit.
        router.load(" ");
        itemService.continueAddText = ' '; //clear the textfield cache.
        localStorage.setItem("continue", ' ');
      }
    },
    updateInput: function(input){
      itemService.continueAddText = input.target.value;
      localStorage.setItem("continue", input.target.value); //textfield cache
      this.setState({
        continueAddText: input.target.value
      });
      //if(this.state.edit)
    },
    render: function () {
      localStorage.setItem('lastPage', "add");
        return (
            <div className={"page " + this.props.position}>
                <Header text="Add Item" back="true"/>
                <div className="card">
                <ul className="table-view">
                <div className="bar bar-standard">
                    <input type="text" value={this.state.continueAddText} onChange={this.updateInput}  />
                    <a > <input className="input-add btn-5" type="submit" href="#" onClick={this.addTodo}/> </a>
                </div>
                </ul>
                </div>
            </div>
        );
    }
});

var App = React.createClass({
    mixins: [PageSlider],
    getInitialState: function() {
        return {
            searchKey: 'a',
            items: itemService.items
        }
    },
    searchHandler: function(searchKey) {
        itemService.findByName(searchKey).done(function(items) {
            this.setState({
                searchKey:searchKey,
                items: items,
                pages: [<HomePage key="list" searchHandler={this.searchHandler} searchKey={searchKey} items={items}/>]});
        }.bind(this));
    },
    componentDidMount: function() {
        router.addRoute('', function() {
            this.slidePage(<HomePage key="list" searchHandler={this.searchHandler} searchKey={this.state.searchKey} items={this.state.items}/>);
        }.bind(this));
        router.addRoute('items/:id', function(id) {
            this.slidePage(<ItemPage key="details" itemId={id} service={itemService}/>);
        }.bind(this));
        router.addRoute('add', function(id) {
            this.slidePage(<AddPage key="details" itemId={id} service={itemService}/>);
        }.bind(this));
        router.start();
        console.log(itemService.lastPageRouter +"?");
        router.load(itemService.lastPageRouter);
    }
});

React.render(<App/>, document.body);
