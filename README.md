# NGRX Invoice - V13

## RUN PROJECT

```
npm install
npm start
npm run server-auth
```

---

## FEATURES

* Utilizzo di Angular 13.x, NGRX 13.x e Bootstrap 5
* Autenticazione JWT: login, gestione token, interceptors, router guards
* Gestione Profilo utente
* Sezioni (aka features) che gestiscono diverse porzioni di stato attraverso l'utilizzo selettori, reducer ed effetti
* Gestione errori
* Gestire lo stato di apertura dei pannelli
* Approccio component-based, custom modules e lazy loading



---

# STEP APPLICAZIONE INVOICE

## CH: PROGETTAZIONE
* Intro applicazione: modules
* Intro applicazione: components
* Intro applicazione: store
* Intro applicazione: folders

## CH: PREPARAZIONE PROGETTO
* Strutturare applicazioni angular scalabili
* Moduli features:  home, login, profile, invoice-editor
* Routing & lazy loading
* Integrazione bootstrap e SCSS
* Integrazione font-awesome e font-awesome
* Navigation Bar
* Core Module, SharedModule & forRoot

## STORE
- integrazione NGRX Store in CoreModule
- creare lo store (vuoto)
- runtimecheck

## NGRX ROUTER
- Installazione e Configurazione
- Actions
- Reducer
- Select (non serve)
- Esempio di Utilizzo


----

## NGRX EFFECTS: sezione "User Profile"
- json-server
- environments properties
- Profile Component: creare la UI della sezione
- Profile Service: Creare un servizio per la gestione delle chiamate HTTP
- Profile Actions: gestire le azioni
- Profile Effects: side effects
- Profile Reducer: manipolare lo stato
- profile Selectors: recuperare dati dallo stato
- AppState

MISSING:
* core: index reducers e ActionReducerMap


# CH:  Authentication
    * Actions
    * Reducer
    * Selector
    * Service
    * Effects
    * UI: login 
    * Route Guard: protezione view
    * HTTPInterceptor
    * AutoLogin


## STORE `forFeature`: sezione Invoice Editor

* Introduzione
    * Goal / Demo
        - video con l'applicazione
    * Struttura Store
        - video che mostra il reducer
    * Struttura componenti
        - diagramma componenti
        - demo video della app con i componenti
    * Organizzazione cartelle

* Preparazione InvoiceEditorModule
    * Store `forFeature`
    * ActionReducerMap e l'index dei reducers
    * preparare reducer vuoti
    * Container Components

* `clients`: Creare Stateless Applications
    * Azioni
    * Reducer
    * Effects
    * Selectors
    * Creare la UI per il pannello Clienti
    * Componente List: Inline editing dei clienti
    * Componente Header: Inserimento Clienti

* `httpStatus`: gestire messaddi di errore e success
    * reducer
    * selector

* `ui`: Gestione Pannelli e UI
    * Actions
    * Reducer
    * Selector


* `invoices/entities`: gestione CRUD
    * Actions
    * Reducer
    * Selectors: get invoices list & calculate next invoice number
    * Effects
    * UI

* `invoices/activeInvoiceId`: Creazione e modifica fatture
    * Actions
    * Reducer
    * Selectors
    * Effects
    * UI: utilizzo dei Reactive Forms
    * UI: creare una view per la stampa della fattura
    * Print

MISSING in video
* visualizzazione più carina della lista fatture
* invoice-form: reactive forms
* invoice-form: item form array
* completare reactive form (connessione a clienti, date filter ecc.)
* ENHANCEMENT: invoice-editor.effect (setActive vs createNEw)
* LAYOUT

OTTIMIZZAZIONI:


V - onPush
V - index.ts nelle cartelle
V - router- redirect corretto al login all'avvio dell'app
V - evitare piu async stesso observable con ngif...as

TPS:
- consiglio utile: usare split screen e mettere componenti da sx a destra, a sx parent, a dx figli

- actions: passare sempre e solo il minimo di informazioni che servono  (id e non invoice)


---

EXTRA:

* ngrx offline: ngrx-store-localstorage
* unit test
  NOTA: very cool syncCondition


