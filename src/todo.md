# To do:

- als je ‘edit’ klikt voor een stuk en dan ‘cancel’ dan sluit ie het hele ding, maar de cancel zou je eigenlijk terug moeten brengen naar de ‘reading mode’

- firebase setup
- log in page
- export/import data to start typing adventures in this

- logo toevoegen

- change Input component name to Searchbar

- change contentdatabase to firebase
- switch mention setup to async

- style external link and inputlightbox you get when you add a link in editor

- adventures overview

- mentiondropdown searching for 'monsters' will show only the label

## Not that important right now:

- make sure dropdown from 'more icon' in chapter goes away when clicking outside it.
- renaming NPCs to general cards
- show headers after typing in mention
- animation when card gets deleted

## Maybe:

- content card groups
- add/remove categories

# DONE

## past

X - 1. hernoemen heeft de addCardHandler argument aangepast, maar kan niet meer terugkijken in de timeline omdat de naam is aangepast.
X - 4. support longer title + descriptions
X - 5. check CardHeaderContainer class in NPCEditor
X - 6. delete npc
X - 7. handle change delete to cancel if editing and not creating in NPCEditor
X - 3. items worden gedupliceerd bij het opslaan na editen, de oude moet weg.
X - 2. na het saven van bestaande npcs, blijft de open property op true. ook als ze open staan, en je switcht van tab
X - 8. change delete button label to cancel if editing and not creating in NPCEditor
X - icons in tabs
X - fixed editor -> set width
X - long names in mention dropdown
X - mention dropdown style
X - monster cards

## 2-2-2021

X - filtering in mention isn't working correctly, if @g, syka shows up
X - check/give cap to mentions dropdown

## 3-2-2021

x - change css to scss
X - add/remove chapter cards

## 4-2-2021

x - search icon in search bar

## 5-2-2021

X - Make sure the function runs through all chapters, not just ch1 -> remove links but keep text of mentions if item is deleted --> CHECK IF IT WORKS IF CHAPTER IS NOT ACTIVE

## 6-2-2021

X - check udemy course on how to add props to useEffect dependency that only mounts on init
X - location cards
X - write down what needs to be edited for adding a category
X - change placeholder texts for different categories

## 7-2-2021

X - change all remove/add NPC functions to remove/add Card

## 8-2-2021

X - icons in chaptercards based on how many unique mentions are in them
X - add things to AddingCategoryChecklist.md
X - hover on mentiontokens

## 9-2-2021

X - tabs in seperate component
X - check and optimize a bit
X - empty state for search results
X - have different empty state if there are no items in the database -> "add some chapters"

## 10-2-2021

X - Create delete this item modal
X - Implement are you sure modal + illustration
X - Dragons Quill logo design

## 11-02-2021

X - remove token if deleted from chapterEditor
X - bug: create mention in text editor, change chapter, change back, you can't delete mention and cursor stays back 1 character

## 12-02-2021

X - bug: when editing/saving an existing npc, the id isn't transfered, a new one is created

## 13-02-2021

X - change all related mentions if character name is edited
(Op dit moment pas ik de edited property aan van het item wat ge edit is. Dit is niet praktisch omdat ik dan in ContentWrapperRight weer door alle data heen moet loopen, ipv dat ik direct de goede naam/id stuur naar de editMentionNameInEditor functie in ContentWrapperRight.)
X - only change mention names if the name changed and loop through all chapters

## 15-02-2021

X - only show 1 mentiontoken per mentionId in chapter
X - make sure empty names can't be submitted or change value after they're submitted to 'untitled' or smt
X - bug where mentionlist had sidescroll

## 16-02-2021

X - Delete chapters/edit name -> elipses + dropdown --> als edit>Save geklikt wordt, moeten mentiontokens properties ook goed overgezet worden. dit gebeurt nu alleen nog goed voor andere cards. er wordt alleen id,key en value overgezet

X - zorg ervoor dat sort content de ids goed sort van chapter, nu lijkt het niet te werken
X - NPCs en NPCeditor -> card en cardeditor

X - editing carditem !== chapter returns error

X - set delete button in chapter editor toolbar to cancel instead of delete + geen pointer op backgroundcard als je edit

## 17-02-2021

X - basic responsiveness

X - mobile header
X - click to switch left/right side
X - on mentionclick, switch sides then open mentioncard
X - padding editor on mobile less
X - fixed mobile header bar

## 18-02-2021

X - upload 1st version to domain
X - editing newly created chapter error
X - hover op header icons in editor toolbar
X - zoekbalk query blijft staan tussen tabswitch
X - tooltip dropdown in chapter cuts off on mobile

<!--
<div class="ql-editor" data-gramm="false" contenteditable="true" data-placeholder="Start writing here...">
  <p>
    aiwejfoiaw
    <span class="dndmention" data-index="2" data-denotation-char="" data-id="np10" data-value="Esmee Gluttonbelly">
      &#65279;
        <span contenteditable="false">
          Esmee Gluttonbelly
        </span>
      &#65279;
    </span>
    dsidjfoaiwefj
    <span class="dndmention" data-index="3" data-denotation-char="" data-id="np4" data-value="Falmo">
      &#65279;
        <span contenteditable="false">
          Falmo
        </span>
      &#65279;
    </span>
    zdfwef
    </p>
  </div>


  old replacement of mentions:
    replaceMentionWithNameDocument(contentArray, itemIdPrefix) {
    let mentions = document.getElementsByClassName("dndmention");

    for (const mention of mentions) {
      const mentionId = mention.getAttribute("data-id");
      //since let mentions gets all dndmentions, it needs to check if it actually is an npc/monster
      if (mentionId.substring(0, 2) === itemIdPrefix) {
        //get all ids to see which one got deleted
        const contentIds = contentArray.map((el) => el.id);
        if (!contentIds.includes(mentionId)) {
          const span = document.createElement("span");
          const content = mention.childNodes[1].textContent;
          span.textContent = content;
          mention.insertAdjacentElement("afterend", span);
          mention.remove();
        }
      }
    }
  } -->
