class RandomDataService {
  static generateRandomDate(
    startYear = 2023,
    endYear = new Date().getFullYear()
  ) {
    const start = new Date(startYear, 0, 1);
    const end = new Date(endYear, 11, 31);
    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return randomDate.toISOString().replace("T", " ").split(".")[0];
  }

  static generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static generateRandomString(length) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
  }

  static generateRandomLocation() {
    return {
      lng: parseFloat((Math.random() * 360 - 180).toFixed(6)),
      lat: parseFloat((Math.random() * 180 - 90).toFixed(6)),
      geohash: this.generateRandomString(8),
    };
  }

  static generateRandomFile() {
    return {
      path: `loads/${this.generateRandomString(20)}/${this.generateRandomString(
        10
      )}.png`,
      name: `${this.generateRandomNumber(1, 10)}.png`,
      dateCreate: {
        _seconds: Math.floor(Date.now() / 1000),
        _nanoseconds: Math.floor(Math.random() * 1000000000),
      },
      url: `https://example.com/${this.generateRandomString(
        20
      )}/file.png?alt=media&token=${this.generateRandomString(32)}`,
    };
  }

  static generateRandomContact() {
    return {
      locationName: this.generateRandomString(10),
      phone: `(${this.generateRandomNumber(
        100,
        999
      )}) ${this.generateRandomNumber(100, 999)}-${this.generateRandomNumber(
        1000,
        9999
      )}`,
      contact: this.generateRandomString(5),
    };
  }

  static generateRandomOfValues(values) {
    return values[Math.floor(Math.random() * values.length)];
  }
}

class LoadGenerator {
  static generateLoad() {
    const dateCreate = Math.floor(Date.now() / 1000);

    return {
      miles: RandomDataService.generateRandomNumber(300, 10000),
      age: RandomDataService.generateRandomNumber(10, 100),
      datePickUpStart: RandomDataService.generateRandomDate(),
      voidedReason: null,
      length: RandomDataService.generateRandomNumber(30, 60),
      equipment: RandomDataService.generateRandomNumber(1, 70),
      weight: RandomDataService.generateRandomNumber(100, 150),
      datePickUpEnd: RandomDataService.generateRandomDate(),
      company: {
        name: "Transloop Logistic Lic",
        cs: 93,
        dtp: 19,
        contact: {
          email: "jason.saks@transloop.com",
        },
      },
      comments: RandomDataService.generateRandomString(40),
      dateCreate: {
        _seconds: dateCreate,
        _nanoseconds: Math.floor(Math.random() * 1000000000),
      },
      loadNum: RandomDataService.generateRandomNumber(1, 1000),
      addressPickUp: {
        zip: RandomDataService.generateRandomNumber(10000, 99999).toString(),
        route: RandomDataService.generateRandomString(10),
        stateLongName: "California",
        streetNumber: RandomDataService.generateRandomNumber(
          1000,
          9999
        ).toString(),
        city: RandomDataService.generateRandomOfValues([
          "Los Angeles",
          "Hudson",
          "Liberty",
          "Kingston",
        ]),
        street: `${RandomDataService.generateRandomNumber(
          1000,
          9999
        )} ${RandomDataService.generateRandomString(10)}`,
        unitNumber: null,
        location: RandomDataService.generateRandomLocation(),
        state: "CA",
        dho: RandomDataService.generateRandomNumber(10, 100),
      },
      fullPartial: RandomDataService.generateRandomNumber(1, 2),
      dateDropOff: RandomDataService.generateRandomDate(),
      puContact: RandomDataService.generateRandomContact(),
      doContact: RandomDataService.generateRandomContact(),
      addressDropOff: {
        zip: RandomDataService.generateRandomNumber(10000, 99999).toString(),
        route: RandomDataService.generateRandomString(10),
        stateLongName: "Texas",
        streetNumber: RandomDataService.generateRandomNumber(
          1000,
          9999
        ).toString(),
        city: RandomDataService.generateRandomOfValues([
          "Los Angeles",
          "Hudson",
          "Liberty",
          "Kingston",
        ]),
        street: `${RandomDataService.generateRandomNumber(
          1000,
          9999
        )} ${RandomDataService.generateRandomString(10)}`,
        unitNumber: null,
        location: RandomDataService.generateRandomLocation(),
        state: "TX",
        dho: RandomDataService.generateRandomNumber(10, 100),
      },
      desc: RandomDataService.generateRandomString(50),
      commodity: null,
      id: RandomDataService.generateRandomString(20),
      amount: parseFloat((Math.random() * 1000).toFixed(2)),
      route: {
        duration: {
          text: "1 day 1 hour",
          value: RandomDataService.generateRandomNumber(3600, 90000), // Random duration value in seconds
        },
        path: RandomDataService.generateRandomString(100),
        img: RandomDataService.generateRandomFile(),
        distance: {
          text: `${RandomDataService.generateRandomNumber(100, 2000)} mi`,
          value: parseFloat((Math.random() * 2000).toFixed(2)),
        },
      },
      truckType: RandomDataService.generateRandomNumber(1, 10),
      status: RandomDataService.generateRandomNumber(1, 5),
      files: [
        RandomDataService.generateRandomFile(),
        RandomDataService.generateRandomFile(),
      ],
    };
  }

  static generateLoadArray(length) {
    return Array.from({ length }, () => this.generateLoad());
  }
}

export const loads = LoadGenerator.generateLoadArray(20);
