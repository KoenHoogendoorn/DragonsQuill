# Adding a new category to the app

## 1. ContentData

### Database

Add a category in the database. The first item should be:
{
id: "ca0",
value: "Category",
disabled: true
}

### Sort content

- slice
- sort
- pushHeadersFirst(category)
- updatedState

### Toggle card

- slice
- switch with togglecard(category2)
- updatedState

### Highlight card

- slice
- switch with pushCardFirst(category3) & setHighlighted(category3)
- pushHeadersFirst(category3)
- updatedState

### Remove card

- slice
- switch with filter
- updatedState

### Add card

- slice
- switch with push
- updatedState

### Close cards

- slice
- switch with foreach
- updatedState

### Add to mention counters

- switch with includes and push
- updatedState

## 2. ContentWrapperRight

### MentionBlot

switch statement:

- props.closecardHandler
- props.activeTabHandler
- clickedItem find
- clickCardHandler

### componentDidUpdate

- if statement:
  - deletedId
  - deletedName
  - add forEach -> replaceMentionWithName (this is for chapters, don't add category.id here)

### placeholders

- handleNamePlaceholder
- handleDescriptionPlaceholder
- handleContentPlaceholder

### Mention -> Source

- add this.props.category to let values with concat

### mapStateToProps

- category: state.contentData.category

## 3. ContentWrapperLeft

### add usestate for addingCategory

- const [addingCategory, setAddingCategory] = useState(false);

### newContentButtonHandler

- switch case with setAddingState to true

### cancelEditingExistingCard

- switch case with setAddingState to false

### activeNewContentCardHandler

- add addingLocation to if condition

### editItemHandler

- switch statement with setAddingLocation(true)

### activeContentHandler

- add categoryList with:
  - forEach that closes an item if they're outside of search results
  - filter for searchbar
  - map through props.category with Card component
- add the categoryList to switch statement at the bottom

### mapStateToProps

- category: state.contentData.category

## 4. Card (currently NPC)

### Switch that closes card

- add case for category that sets a thisItem const and closes them if it's not the current tab.

### mapStateToProps

- category: state.contentData.category

## 5. CardBody

### Switch that closes cardBody

- add case for category that sets a thisItem const that finds the clicked item

### mapStateToProps

- category: state.contentData.category

## 6. CardHeaderContainer

### clickedCardHandler

- add case to switch for category that sets a clickedCard const that finds the clicked item

### mapStateToProps

- category: state.contentData.category

## 7. CardEditor (currently NPCEditor)

### componentDidMount

- Add category const that contains this.props.category
- add case for category that maps through the constant to remove the prefixes from the current items

### mapStateToProps

- category: state.contentData.category

## 8. MentionToken

### Switch

- find and add iconclasses
- Add find function for name in tooltip

### SCSS

- add colors for icons

### mapStateToProps

- category: state.contentData.category

## 9. shared variables

### colors

- add main and bg color for icons

# 10. TabsContainer

- add tab component with contentType and clickTabHandler
