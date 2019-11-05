

void setup() {
  // put your setup code here, to run once:
     Serial.begin(9600);
    
}

void loop() {
  float sensorValue = analogRead (A0);
  float lum=0;
  float vo = sensorValue * (3.56 / 1024.0);
  float frec = vo/(0.000986);
  String watt = "";
  if(vo >= 0 && vo <= 0.70){
    lum = 0;
    watt = "0";
  }else if(vo> 0.70 && vo<=0.89 ){
    lum =370;
    watt = "40";
  }else if(vo> 0.90 && vo <=1.17){
    lum = 900;
    watt = "70";
  }else if(vo > 1.18 && vo <= 1.39){
    lum=864;
    watt = "24";
  }else if(vo > 1.40 && vo <= 1.73){
    lum=950;
    watt = "100";
  }else if (vo > 1.74 && vo <= 1.85){
    lum=1900;
    watt = "200";
  }
  else {
    lum=4984;
    watt = "434";
  }

  
  Serial.println("\n");
  Serial.println("  VOLTAJE V0 [ "+String(vo)+" ] " + " FRECUENCIA Hz [ "+String(frec)+" ] "+" LUMENS [ "+String(lum)+" ]  WATTS W[ "+watt+" ]");
  Serial.println("\n");

  delay(1000);
}
