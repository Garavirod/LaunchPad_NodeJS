void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
    float sig_temp = analogRead(A0);
    float sig_luz = analogRead(A4);
    float sig_mag = analogRead(A3);
    
    float vo_temp = sig_temp * (3.3 / 1024.0);
    float vo_luz = sig_luz * (3.56 / 1024.0);
    float vo_mag = sig_mag * (3.3/1024.0);
    Serial.println(vo_temp);
    Serial.println(vo_luz);
    Serial.println(vo_mag);
    delay(1000);
}
