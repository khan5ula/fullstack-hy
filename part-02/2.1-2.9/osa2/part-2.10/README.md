Jos koko sovelluksesi on tehty yhteen komponenttiin, refaktoroi sitä eriyttämällä sopivia komponentteja. Pidä kuitenkin edelleen kaikki tila- sekä tapahtumankäsittelijäfunktiot juurikomponentissa App.

Riittää että erotat sovelluksesta kolme komponenttia. Hyviä kandidaatteja ovat filtteröintilomake, uuden henkilön lisäävä lomake, kaikki henkilöt renderöivä komponentti sekä yksittäisen henkilön renderöivä komponentti.

Sovelluksen juurikomponentin ei tarvitse refaktoroinnin jälkeen renderöidä suoraan muuta kuin otsikoita. Komponentti voi näyttää suunnilleen seuraavalta: