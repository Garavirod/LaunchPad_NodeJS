void setup() {
  // put your setup code here, to run once:
     Serial.begin(9600);
}

void loop() {
  float sensorValue = analogRead (A0);

  float voltaje = sensorValue * (3.3 / 1024.0);

  Serial.println(voltaje);
  Serial.println("1");  
  Serial.println("2");
  delay(1000);
}
