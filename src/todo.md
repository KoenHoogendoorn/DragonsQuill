# To do:

### Test:

- checken of namen met gekke tekens e.d. voor problemen zorgen bij file download en upload

### High prio features

- update downloadfilebutton to include input value/story

- ability for chapters to change order

## Not that important right now:

- only show 'are you sure alert' when you've changed something
- change Input component name to Searchbar
- switch mention setup to async - not sure what I wanted here

### bug

- if you click on an icon that opens a dropdown, when the dropdown is open, it should close again. Now it stays open.

- als je ‘edit’ klikt voor een niet-chapter stuk en dan ‘cancel’ dan sluit ie het hele ding, maar de cancel zou je eigenlijk terug moeten brengen naar de ‘reading mode’

- mentiondropdown searching for 'monsters' will show only the label

### features

- renaming NPCs to general cards
- show headers after typing in mention
- animation when card gets deleted

- firebase setup
- log in page
- export/import data to start typing adventures in this

- change contentdatabase to firebase
- adventures overview

## Maybe:

- style external link and inputlightbox you get when you add a link in editor
- content card groups
- add/remove categories
- add shortcut to save file

# DONE

- added adventure to state down/upload

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

## 06-07-2022

X Ability to change adventure title

X remove clickable icon component
X create dropdown component
X create settings button next to logo, add dropdown component to it

X put download data, upload json file and change adventure title in it
X if change adventure title is clicked, show modal with input to change it

## 09-07-2022

X new adventure on click button in landing page. When you click on 'new adventure':

X. overwrite contentdata with fully empty state
X. you see a modal where you can input an adventure title
X. make it so you can change the title in the adventure name modal
X. add new adventure title in state

X demo adventure on click button in landing page

## 13-07-2022

X. Bug - when there are no chapters, typing in quill crashes. Add readOnly prop as true so you can't type

## 20-07-2022

X upload state in landingpage
X change design to remove drag n drop in landing page
X change css design
X responsiveness landingpage

## 27-07-2022

X click on logo to get back to landing page
X click logo
X show are you sure modal

## 30-07-2022

X if you edit a chapter name, it removes the mention icons and shows them only after editing text in editor.

## 03-08-2022

X settings button on mobile goes offscreen
X make save button more prominent

## 02-10-2022

X show demo non-story-content is not uploaded when show demo is clicked after upload file or new adventure is clicked. Dit omdat het hardcoded in contentdata staat, en niet los geupload wordt zoals de content in componentdidmount van contentwrapperright. Ik denk dat alle npcs etc daar ook geupload moeten worden.

X in contentWrapperRight word content hardcoded geupload naar een locale state. Ik heb geprobeerd om het in LandingPage mee te geven en het uit contentData op te halen in contentwrapper right, maar dat gebeurt niet

X chapter content wordt niet meer meegegeven in contentwrapperright maar vanuit landingpage. In contentwrapperright wordt alleen nog niet data meegegeven uit loaded files. Ook wordt er niet door alle chapters heengegaan als er meer dan 1 is. ->dit hoeft geloof ik niet, alleen de eerste moet erin gezet worden omdat die zichtbaar is

X Als je achter elkaar items upload, zie je telkens de chapter content van de vorige geuploade file. Waarschijnlijk gaat er iets fout bij de componentdidmount in ContentWrapperRight

X De data die geupload wordt, moet eerst volledig geupload zijn voordat er van pagina geswitched wordt naar de editor. Nu doe ik dat lomp met een setTimeout, maar eigenlijk moet het met een await of promise function oid. (misschien: https://www.pluralsight.com/guides/asynchronous-file-upload-react ?)
of deze: https://www.youtube.com/watch?v=DHvZLI7Db8E en deze https://www.youtube.com/watch?v=V_Kr9OSfDeU

X een nieuwe story wordt ineens niet meer geladen. Oude statefiles komen wel goed door. Nieuwe krijgen 'undefined' in de editor. - gebeurt toch niet

X nieuwe mentions worden niet toegevoegd in de editor. misschien komt dit omdat ik nu de state opsla in contentData? het kan ook komen omdat er in ContentWrapperRight een ... staat bij de quill-mention import. Blijkbaar mist er een file. Het zou kunnen dat deze handmatig toegevoegd moet worden.

X nieuwe mentions worden niet toegevoegd in de editor. Met de commente code in de componentdidmount in contentwrapperright werkt wel.

X zorg ervoor dat de redux state eerst update bij het overwriten van de state met demo of loaded content, en dat de pagina daarna pas switched. Of check in contentwrapperright in componentdidupdate of de soort contentdata overeenkomt met de democontent state die meegegeven wordt. -->alles wat nodig was, was om de 'return' weg te halen in het initialiseren van de ch1 content. Dit zodat het mentiongedeelte gewoon uitgevoerd werd?

## 26-10-2022

the story isn't being saved in every chapter of niet elke chapter wordt gesaved, alleen de 1e lijkt het

X add input value to app state instead of local state

XX Als showdemo geklikt wordt, en daarna nieuwe content geupload, blijft de democontent staan. eigenlijk moet het zo werken dat geen content in contentData standaard is en democontent eropgezet wordt als op show demo geklikt wordt. Als het goed is wordt de content dan standaard gecleared als de app opstart/herstart.
X bug: geuploade content staat er pas na de 2e keer uploaden

X alles wordt correct gedownload en upload, bij het switchen van chapters met een geuploade file gaat er iets mis. Het klikken op een tab gaat goed, maar het renderen ervan in contentwrapperright niet. Als er op een chaptercard geklikt wordt, wordt er een chapter id meegegeven aan de activeChapterId reducer. Ik geloof dat er iets gebeurt hiervoor in de laatste componentDidUpdate functie, maar waarschijnlijk moet hiervoor iets geschreven worden. -> de state moet worden opgehaald in de localstate als chx (gebruik id) -> CTR F: NIEUWSTUK

X als je typt, gaat een chapter naar onder in volgorde. Bij elke render van contentwrapperleft wordt sortContentHandler uitgevoerd. Misschien moet dit ook gebeuren bij de verandering van een tekst in een chapter. Nu gebeurt dit geloof ik niet, omdat alleen dat onderdeel gererendered wordt.

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
