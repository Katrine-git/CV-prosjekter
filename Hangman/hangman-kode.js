        //Lager en array med alle ordene
        var ord = ["inkrementering", "konkatinering", "javascript", "kodeeditor", "filstruktur", "utvikling", "animasjon", "brukerinput", "tastaturknapp", "planleggingsfase"];
        //definerer en tom array der bokstaver skal havne
        var gjettarray = [];

        //definerer variabler, løsningsord, teller og liv. Defineres globalt så man alltid kan få tak i det
        var løsningsordet;
        var teller = 0;
        var liv = 6;

        //funksjon for å lage tastaturet
        function lagTastatur(){
            //bruker en for løkke for å lage en knapp for hver bokstav ved å bruke charkoden til bokstaven og sier lag en knapp fra 97 som er a til 122 som er z.
            var html = '';
            for (var i = 97; 122 >= i; i++) {
                var c = String.fromCharCode(i);
                //her lages knappen ved å si at det skal bli en button med id som den bokstaven som er neste charcode i for loopen, i tilegg til at når knappen trykkes på sendes den til setLetter funksjon med c(bokstaven trykket ned) som parameter.
                html += `<button
                        class="knapp" id='` + c + `' onclick="setLetter(\'` + c + `\')">` + c + `
                    </button>`
            }
            document.getElementById('alfabetet').innerHTML = html;
            //gjør at det vises i html
        }

        //hovedfunksjon
        function main(){
            //setter at restart knapp ikke skal være synlig i starten
            document.getElementById("restart").style.display = "none";
            //kaller på tastatur for å få lagd det
            lagTastatur()

            //velger et random ord fra arrayen vår for å få et tilfeldig løsningsord hver runde
            løsningsordet= ord[Math.floor(Math.random() * ord.length)];
            //Fyller gjettarray med like mange understreker som løsningsordet 
            for(let i=0; i < løsningsordet.length; i++){
                gjettarray[i] = "_";
            }
            let tilTekst = gjettarray.join(" ");
            //Gjør det synlig i html
            document.getElementById("svar").innerHTML = tilTekst;   
        }
        //Funksjonen vi kommer til når en av alfabet knappene trykkes
        function setLetter(x) {
            //disabled knapp etter trykket
            document.getElementById(x).setAttribute('disabled', true);
            //Viser deg alle bokstavene du har gjettet i tillegg til at knappen blir disabled, for oversiktens skyld
            document.getElementById('bGjettet').innerHTML += x + " ";
           //finner index av løsningord for å finne ut om bokstaven du gjetter er i løsningordet eller ikke
            var bokstav2 = løsningsordet.indexOf(x);
            //hver gang du gjetter går teller opp, så vi kan se hvor mange ganger man bruker før man vinner/taper
            teller++;
            
            //hvis indexen er mindre enn null er ikke bokstaven i løsningsordet og vi går inn i denne if setningen
            if(bokstav2 < 0){
                //gjør liv visuelt og oppdaterer for hver gang
                document.getElementById("visLiv").innerHTML = liv;
                //hver gang man tar feil mister du et liv
                liv--; 
                //hva som skal skje hver gang du mister er liv, blir som en if setning bare ryddigere. så når liv oppdateres gjør bilde det også            
                switch(liv){
                case 0:
                    //når liv = 0 har du tapt og da skjer disse tingene:
                    //bilde oppdateres til at du er helt hengt
                    document.getElementById("bilde").src="bilder/hangman_feil6.jpg";
                    //du får opp en tekst som sier du har tapt
                    document.getElementById("status").innerHTML= "Du har tapt :("
                    //knappen som gjør du kan restarte blir synlig
                    document.getElementById("restart").style.display = "block";
                    //Du får opp løsningsordet utskrevet
                    document.getElementById("riktigSvar").innerHTML = "Ordet var: " + løsningsordet;
                   
                    //hele tastaturet blir disabled så du ikke kan gjette mer
                    var list = document.getElementsByClassName("knapp");
                    for (b = 0; b < list.length; b++) {
                        document.getElementsByClassName('knapp')[b].setAttribute('disabled', true);}
                    break; 
                case 1:
                    document.getElementById("bilde").src="bilder/hangman_feil5.jpg"
                    break;
                case 2:
                    document.getElementById("bilde").src="bilder/hangman_feil4.jpg"
                    break;
                case 3:
                    document.getElementById("bilde").src="bilder/hangman_feil3.jpg"
                    break;
                case 4:
                   document.getElementById("bilde").src="bilder/hangman_feil2.jpg" 
                   break;
                case 5:
                    document.getElementById("bilde").src="bilder/hangman_feil1.jpg"
                    break;
                    }
                }
            //hvis bokstaven finnes går vi hit
            //For løkken går gjennom hele ordet og sjekker bokstaven din mor hver plass i løsningsordet
                for(let i=0; i < løsningsordet.length; i++)
                {
                    //hvis et bokstav fra løsningsordet finnes i ditt gjett legges denne bokstaven til gjettarrayen
                    if(løsningsordet[i] === x){
                        gjettarray[i] = x;
                    if(gjettarray.includes("_")){
                        //dersom det fortsatt er underscore i arrayen er ikke spillet ferdig og vi bare fortsetter
                        }
                    else{
                        //Dersom det ikke er flere underscore kommer vi hit for da har du vunnet. da skjer dette:
                        //Får opp en tekst som sier du har vunnet
                        document.getElementById("status").innerHTML ="Du har vunnet"
                        //Gjør restartt knappen synlig
                        document.getElementById("restart").style.display = "block";
                        //Får opp løsningsordet, debatters om er nødvendig når du egt har greid å gjette det, men valgt å beholde for det
                        document.getElementById("riktigSvar").innerHTML = "Ordet var: " + løsningsordet;
                        
                        //disabled hele tastaturet så du ikke kan gjette mer
                        let list = document.getElementsByClassName("knapp");
                        for (b = 0; b < list.length; b++) {
                        document.getElementsByClassName('knapp')[b].setAttribute('disabled', true);}
                         }
                }   
                    //Gjør liv antall ganger gjettet synlig og oppdaterer gjettarray for å se fremdrift
                    document.getElementById("visLiv").innerHTML = "Liv: " + liv +  " Ganger gjettet: " + teller;
                    document.getElementById("svar").innerHTML =  gjettarray.join(" ");
            }   
        }
        //Funksjonen for å restarte spillet
        function nyttSpill(){
            //Tømmer array, setter teller til 0 og resetter liv til 6 igjen
            gjettarray = [];
            teller = 0;
            liv = 6;
            //Tømmer alt av skrift
            document.getElementById("visLiv").innerHTML = "Liv: " + liv +  " Ganger gjettet: " + teller;
            document.getElementById("bGjettet").innerHTML = "Bokstaver gjetter: ";
            document.getElementById("status").innerHTML = "";
            document.getElementById("riktigSvar").innerHTML = "";
            //oppdaterer bilde til startbilde
            document.getElementById("bilde").src="bilder/hangman_start.jpg" 
            //kaller funksjoner for å restarte
            lagTastatur()
            main()
        }