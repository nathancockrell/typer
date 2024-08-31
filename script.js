let passage = "Aztec gold is quintessential by name";
const passageWords = passage.split(' ').length;
let startTime = null;
let passagesSubmitted = 0;
let characterStats = {};
let deletedCharacterStats = {};
let spaceKeyPresses = 0;
let shiftKeyPresses = 0;
let backspaceKeyPresses = 0;
let accuracyScore = 0;
let passageLength=13;


document.addEventListener('DOMContentLoaded', function() {
    generatePassage();
    updateStats();
});

document.getElementById('typing-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    if (!startTime) {
        startTime = new Date();
    }

    let matching = 0;
    let accuracyArray = checkAccuracy();
    accuracyArray.forEach((array)=>{
        array.forEach((item)=>{
            if(item==1)matching++;
            if(item==0)matching--;
        })
    })

    passagesSubmitted++;
    accuracyScore+=matching;
    updateStats();
    generatePassage();
    
    document.getElementById('text-input').value = '';  // Clear input
});

document.getElementById('text-input').addEventListener('keydown', function (e) {
    const key = e.key;
    const inputElement = document.getElementById('text-input');
    
    if (key === 'Enter') {
        e.preventDefault(); // Prevents adding a newline
        document.getElementById('typing-form').dispatchEvent(new Event('submit'));
        return;
    }

    if (key.length === 1) {
        characterStats[key] = (characterStats[key] || 0) + 1;
    } else {
        switch(key) {
            case 'Backspace':
                backspaceKeyPresses++;
                const deletedChar = inputElement.value[inputElement.value.length - 1];
                if (deletedChar) {
                    deletedCharacterStats[deletedChar] = (deletedCharacterStats[deletedChar] || 0) + 1;
                }
                break;
            case 'Shift':
                shiftKeyPresses++;
                break;
            case ' ':
                spaceKeyPresses++;
                break;
        }
    }

    

    updateKeyStats();
});
document.getElementById("text-input").addEventListener("keyup", function () {
    let accuracyArray = checkAccuracy();
    console.log(accuracyArray)
    let buffer=0;
    accuracyArray.forEach((array, index1)=>{
        if(accuracyArray[index1-1])buffer += accuracyArray[index1-1].length+1;
        array.forEach((item, index)=>{
            // let spans = document.querySelectorAll(".passage-span");
            // spans.forEach((span)=>{
            //     span.style.color="black";
            // })
            index+=buffer;
            if(item==1){
                document.getElementById("passage" + index).style.color="green"
            }
            else if(item ==0){
                document.getElementById("passage" + index).style.color="red"
            }
            else {
                let spans = document.querySelectorAll(".passage-span");
                spans.forEach((span)=>{
                    span.style.color="black";
                })
            }
        })
    })
    // auto submit at last character entered
});
document.getElementById('text-input').addEventListener("paste", e => e.preventDefault());

function generatePassage(){
    document.getElementById("passage").innerHTML=""
    passage="";
    let words = ["the", "to", "i" , "and" , "of" , "he" , "was" , "you" , "her" , "not" , "it" , "in" , "she" , "his" , "that" , "is" , "my" , "with" , "me" , "had" , "on" , "as" , "for" , "but" , "at" , "him" , "have" , "do" , "be" , "what" , "would" , "said" , "out" , "they" , "we" , "up" , "this" , "from" , "did" , "are" , "could" , "so" , "were" , "all" , "if" , "back" , "like" , "one" , "there" , "no" , "into" , "will" , "just" , "when" , "about" , "then" , "them" , "been" , "know" , "am" , "your" , "over" , "down" , "an" , "or" , "time" , "eyes" , "now" , "by" , "more" , "get" , "how" , "can" , "who" , "their" , "before" , "around" , "even" , "way" , "going" , "see" , "head" , "us" , "here" , "right" , "only" , "want" , "off" , "through" , "looked" , "go" , "think" , "hand" , "some" , "again" , "away" , "too" , "still" , "something" , "than" , "face" , "other" , "never" , "asked" , "after" , "thought" , "man" , "where" , "let" , "good" , "look" , "made" , "well" , "much" , "two" , "why" , "because" , "knew" , "got" , "little" , "door" , "our" , "any" , "come" , "room" , "take" , "make" , "say" , "first" , "long" , "its" , "felt" , "took" , "wanted" ,
         "turned" , "need" , "tell" , "hands" , "really" , "sure" , "against" , "voice" , "should" , "has" , "left" , "very" , "told" , "came" , "another" , "people" , "which" , "while" , "last" , "few" , "life" , "anything" , "body" , "cannot" , "behind" , "night" , "nothing" , "being" , "enough" , "went" , "feel" , "does" , "thing" , "side" , "might" , "day" , "saw" , "until" , "things" , "though" , "those" , "yes" , "maybe" , "put" , "find" , "own" , "every" , "ever" , "once" , "hair" , "moment" , "both" , "always" , "love" , "next" , "looking" , "mind" , "place" , "inside" , "help" , "front" , "without" , "found" , "hard" , "house" , "keep" , "same" , "mouth" , "most" , "himself" , "someone" , "everything" , "toward" , "home" , "woman" , "trying" , "heard" , "pulled" , "open" , "arms" , "better" , "each" , "between" , "give" , "seemed" , "new" , "old" , "smile" , "across" , "work" , "myself" , "since" , "already" , "started" , "bed" , "small" , "gave" , "father" , "almost" , "stood" , "years" , "done" , "mother" , "heart" , "doing" , "okay" , "tried" , "lips" , "under" , "walked" , "else" , "stop" , "words" , "three" , "nodded" , "feet" , "together" , "must" , "dark" , "mean" , "held" , "seen" , "many" , "sat" , "world" , "men" , "girl" , "arm" , "black" , "light" , "blood" , "close" , "breath" , "far" , "hear" , "car" , "says" , "yet" , "leave" , "smiled" , "talk" , "gone" , "herself" , "kind" , "end" , "fingers" , "call" , "began" , "needed" , "floor" , "also" , "shook" , "getting" , "name" , "air" , "table" , "lot" , "yeah" , "finally" , "water" , "called" , "course" , "coming" , "part" , "probably" , "such" , "big" , "least" , "moved" , "happened" , "along" , "past" , "deep" , "second" , "reached" , "believe" , "best" , "sorry" , "stopped" , "later" , "phone" , "bit" ,
         "feeling" , "sound" , "making" , "opened" , "soon" , "ask" , "anyone" , "used" , "set" , "great" , "everyone" , "idea" , "family" , "bad" , "taking" , "dead" , "shoulder" , "move" , "kept" , "forward" , "skin" , "care" , "morning" , "quickly" , "white" , "days" , "stay" , "rest" , "try" , "slowly" , "able" , "onto" , "wall" , "alone" , "remember" , "turn" , "having" , "thinking" , "closed" , "stared" , "ground" , "wrong" , "ready" , "mine" , "please" , "talking" , "red" , "watched" , "either" , "ran" , "minutes" , "hurt" , "neck" , "outside" , "actually" , "top" , "suddenly" , "friend" , "pain" , "fine" , "hold" , "understand" , "lost" , "fact" , "gaze" , "matter" , "run" , "point" , "standing" , "real" , "wait" , "boy" , "caught" , "times" , "pretty" , "whole" , "full" , "dad" , "word" , "instead" , "laughed" , "answer" , "waiting" , "chapter" , "fire" , "may" , "friends" , "taken" , "others" , "half" , "ago" , "different" , "looks" , "use" , "legs" , "whispered" , "glanced" , "cold" , "young" , "hit" , "brother" , "met" , "brought" , "high" , "king" , "fell" , "throat" , "question" , "whatever" , "window" , "blue" , "reason" , "start" , "meant" , "holding" , "stepped" , "exactly" , "kiss" , "death" , "leaned" , "quite" , "sitting" , "watching" , "large" , "walk" , "realized" , "school" , "hope" , "happy" , "touch" , "show" , "followed" , "running" , "thank" , "person" , "sense" , "guess" , "closer" , "hours" , "several" , "grabbed" , "continued" , "replied" , "chair" , "watch" , "power" , "true" , "sleep" , "beautiful" , "attention" , "pushed" , "human" , "longer" , "beside" , "hot" , "saying" , "nice" , "shoulders" , "four" , "shot" , "chance" , "five" , "eye" , "tonight" , "glass" , "line" , "today" , "baby" , "moving" , "living" , "given" , "perhaps" , "money" , "change" , "tears" , "fear" , "read" , "pare" , "job" , "step" , "dropped" , "couple" , "leaving" , "known" , "loved" , "cut" , "shut" , "office" , "kitchen" , "above" , "meet" , "control" , "live" , "women" , "seat" , "stand" , "fight" , "decided" , "near" , "free" , "sister" , "soft" , "case" , "town" , "city" , "spoke" , "rose" , "anyway" , 
        "short" , "passed" , "clear" , "less" , "bring" , "lifted" , "completely" , "ill" , "silence" , "raised" , "stomach" , "working" , "street" , "seeing" , "truth" , "filled" , "staring" , "fast" , "rather" , "corner" , "safe" , "walking" , "guys" , "year" , "pull" , "killed" , "business" , "within" , "edge" , "road" , "happen" , "shirt" , "picked" , "strong" , "speak" , "straight" , "expression" , "late" , "nearly" , "son" , "child" , "sighed" , "teeth" , "sent" , "building" , "yourself" , "sit" , "warm" , "food" , "knowing" , "supposed" , "makes" , "girls" , "sort" , "entire" , "towards" , "ten" , "upon" , "afraid" , "thoughts" , "clothe" , "quiet" , "giving" , "turning" , "noticed" , "miss" , "possible" , "low" , "returned" , "seem" , "waited" , "easy" , "finger" , "kissed" , "worked" , "beneath" , "worry" , "week" , "green" , "become" , "rolled" , "pressed" , "shrugged" , "perfect" , "trust" , "telling" , "deal" , "book" , "thanks" , "barely" , "hour" , "vampire" , "sun" ,
         "wondered" , "answered" , "fall" , "sometimes" , "story" , "surprised" , "laugh" , "break" , "lay" , "immediately" , "tongue" , "figure" , "desk" , "slid" , "minute" , "knows" , "children" , "hey" , "problem" , "pointed" , "coffee" , "during" , "empty" , "wife" , "tight" , "bag" , "plan" , "appeared" , "changed" , "wide" , "play" , "ear" , "months" , "although" , "sky" , "wearing" , "sight" , "pulling" , "drink" , "hall" , "died" , "however" , "heavy" , "simply" , "quick" , "anymore" , "liked" , "gun" , "nose" , "order" , "steps" , "number" , "hers" , "sounded" , "conversation" , "finished" , "slightly" , "knees" , "became" , "lady" , "middle" , "return" , "covered" , "cheek" , "softly" , "sir" , "stone" , "alive" , "six" , "except" , "spent" , "led" , "wish" , "strange" , "sounds" , "direction" , "added" , "important" , "dress" , "certain" , "ahead" , "none" , "thick" , "surprise" , "somehow" , "wants" , "weeks" , "reach" , "tomorrow" , "bar" , "quietly" , "tiny" , "group" , "touched" , "space" , "dinner" , "hundred" , "worse" , "foot" , "somewhere" , "sweet" , "gently" , "tone" , "broke" , "stuff" , "crazy" , "trouble" , "seconds" , "ones" ,
          "kids" , "headed" , "darkness" , "stairs" , "wrapped" , "eat" , "broken" , "remembered" , "area" , "slow" , "doors" , "beyond" , "managed" , "especially" , "silent" , "bedroom" , "wonder" , "worried" , "paused" , "threw" , "questions" , "walls" , "means" , "single" , "anger" , "trees" , "seems" , "placed" , "information" , "drive" , "force" , "huge" , "heat" , "follow" , "gotten" , "expected" , "wind" , "shaking" , "daughter" , "comes" , "angry" , "meeting" , "distance" , "lying" , "doubt" , "game" , "bright" , "catch" , "police" , "cool" , "check" , "crowd" , "paper" , "early" , "piece" , "smiling" , "loud" , "forced" , "party" , "smell" , "glad" , "promise" , "listen" , "serious" , "tree" , "news" , "forget" , "clearly" , "agreed" , "magic" , "pocket" , "snapped" , "guard" , "save" , "pick" , "often" , "box" , "grin" , "keeping" , "choice" , "below" , "tired" , "lip" , "whether" , "takes" , "hung" , "brown" , "tall" , "using" , "playing" , "boys" , "earlier" , "calm" , "pleasure" , "slipped" , "grinned" , "chin" , "obviously" , "further" , "fun" , "locked" , "war" , "evening" , "letting" , "sign" , "hate" , "arrived" , "asking" , "situation" , "bottom" , "lie" , "crossed" , "jumped" , "ship" , "form" , "frowned" , "apartment" , "lights" , "pay" , "rock" , "muttered" , "bathroom" , "carefully" , "sword" , "hoping" , "cheeks" , "explain" , "kid" , "dream" , "showed" , "realize" , "normal" , "lived" , "shed" , "hoped" , "glance" , "ring" , "certainly" , "breathing" , "themselves" , "waist" , "lose" , "imagine" , "grew" , "center" , "position" , "dressed" , "laughing" , "picture" , "husband" , "wet" , "ears" , "wore" , "spot" , "secret" , "cell" , "despite" , "offered" , "definitely" , "land" , "strength" , "talked" , "scared" , "usually" , "sharp" , "clean" , "dog" , "future" , "besides" , "leg" , "easily" , "attack" , "hide" , "jaw" , "doctor" , "view" , "lives" , "shouted" , "helped" , "path" , "queen" , "allowed" , "stayed" , "stare" , "entered" , "remained" , "handle" , "memory" , "fighting" , "handed" , "cry" , "itself" , "forehead" , "soul" , "beginning" , "forever" , "pair" , "music" , "needs" , "neither" ,
           "knife" , "cried" , "sick" , "missed" , "metal" , "truck" , "simple" , "gets" , "grace" , "aside" , "send" , "vampires" , "company" , "beat" , "protect" , "apart" , "twenty" , "ice" , "round" , "captain" , "notice" , "older" , "falling" , "sigh" , "brain" , "energy" , "jeans" , "familiar" , "explained" , "asks" , "cover" , "following" , "married" , "weight" , "hated" , "pale" , "wanting" , "team" , "moments" , "thin" , "afternoon" , "learned" , "spread" , "couch" , "putting" , "push" , "shock" , "silver" , "hospital" , "flesh" , "drove" , "drop" , "relief" , "goes" , "shake" , "turns" , "pass" , "wondering" , "opening" , "wolf" , "settled" , "gold" , "age" , "noise" , "likely" , "understood" , "dangerous" , "stuck" , "state" , "sudden" , "starting" , "carried" , "scent" , "class"];
    for(let i =0;i<passageLength;i++){
        let word = words[Math.floor(words.length*Math.random())]

        if(Math.random()>0.9){
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        // word then space
        // word then dot word
        // word then at word
        // word then at words
        // word then with word as param (not stackable)
        // word then comma space
        let entry = word + " ";
        
        
        passage += entry;
    }
    for(let i = 0; i<passage.length;i++){
        document.getElementById("passage").innerHTML+=`<span id="passage${i}" class="passage-span"
        >${passage.slice(i,i+1)}</span>`
    }
};

function checkAccuracy(){
    let inputText = document.getElementById('text-input').value;
    let accuracyArray = [];
    let pwords = passage.split(' ');
    let iwords = inputText.split(" ");
    
    for(let i = 0;i<iwords.length && i<pwords.length; i++) {
        accuracyArray.push([])
        for(let j=0;j<pwords[i].length && j<iwords[i].length; j++){
            // console.log(j)
            // console.log(iwords[i])
            // console.log(pwords[i])
            if(!iwords[i]){
                accuracyArray[i][j] = 0;
            }
            else if(!iwords[i].charAt(j)){
                accuracyArray[i][j] = 0;
            }
            else if(pwords[i].charAt(j)==iwords[i].charAt(j)){
                accuracyArray[i][j] = 1;
            }
            else {
                accuracyArray[i][j] =0;
            }
        };
    }
    return accuracyArray;
}

function updateStats() {
    const now = new Date();
    const timeDiff = (now - startTime) / 1000 / 60;  // Time in minutes
    const wordsPerMinute = Math.round((passageWords * passagesSubmitted) / timeDiff);
    
    document.getElementById('wpm').textContent = `WPM: ${wordsPerMinute}`;
    document.getElementById('submitted').textContent = `Passages Submitted: ${passagesSubmitted}`;
    document.getElementById('accuracy').textContent = `Accuracy: ${accuracyScore}`;
    
}

function updateKeyStats() {
    const charStatsElement = document.getElementById('char-stats');
    const nonCharStatsElement = document.getElementById('non-char-stats');

    charStatsElement.innerHTML = 'Character Stats:<br>' + Object.entries(characterStats)
        .map(([char, count]) => `${char}: ${count}`).join(' , ');

    charStatsElement.innerHTML += '<br>Deleted Characters:<br>' + Object.entries(deletedCharacterStats)
        .map(([char, count]) => `${char}: ${count}`).join(' , ');

    nonCharStatsElement.innerHTML = `
        Non-character key presses:<br>
        Backspace: ${backspaceKeyPresses}<br>
        Shift: ${shiftKeyPresses}
    `;
}
