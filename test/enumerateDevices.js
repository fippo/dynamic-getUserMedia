describe('enumerateDevices inject', () => {
    beforeEach(() => {
        sessionStorage.clear();
    });

    it('filters audio devices when __filterAudioDevices is set', (done) => {
        sessionStorage.__filterAudioDevices = true;
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                const kinds = devices.map(d => d.kind);
                expect(kinds).not.to.contain('audioinput');
                done();
            });
    });

    it('filters video devices when __filterVideoDevices is set', (done) => {
        sessionStorage.__filterVideoDevices = true;
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                const kinds = devices.map(d => d.kind);
                expect(kinds).not.to.contain('videoinput');
                done();
            });
    });

    it('filters device labels when __filterDeviceLabels is set', (done) => {
        sessionStorage.__filterDeviceLabels = true;
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                const nonEmptyLabels = devices.filter(d => d.label !== '');
                expect(nonEmptyLabels).to.have.length(0);
                done();
            });
    });

    it('filters audio device labels when permission is denied', (done) => {
        sessionStorage.__getUserMediaAudioError = 'NotAllowedError';
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                const audioDevicesWithLabels = devices.filter(d => d.kind === 'audioinput' && d.label !== '');
                expect(audioDevicesWithLabels).to.have.length(0);
                done();
            });
    });

    it('filters audio device ids when permission is denied (Chrome only)', (done) => {
        sessionStorage.__getUserMediaAudioError = 'NotAllowedError';
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                const audioDevicesWithDeviceIds = devices.filter(d => d.kind === 'audioinput' && d.deviceId !== '');
                if (navigator.mozGetUserMedia) {
                  expect(audioDevicesWithDeviceIds).not.to.have.length(0);
                } else {
                  expect(audioDevicesWithDeviceIds).to.have.length(0);
                }
                done();
            });
    });

    it('filters video device labels when permission is denied', (done) => {
        sessionStorage.__getUserMediaVideoError = 'NotAllowedError';
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                const videoDevicesWithLabels = devices.filter(d => d.kind === 'videoinput' && d.label !== '');
                expect(videoDevicesWithLabels).to.have.length(0);
                done();
            });
    });

    it('filters video device ids when permission is denied (Chrome only)', (done) => {
        sessionStorage.__getUserMediaVideoError = 'NotAllowedError';
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                const videoDevicesWithDeviceIds = devices.filter(d => d.kind === 'videoinput' && d.deviceId !== '');
                if (navigator.mozGetUserMedia) {
                  expect(videoDevicesWithDeviceIds).not.to.have.length(0);
                } else {
                  expect(videoDevicesWithDeviceIds).to.have.length(0);
                }
                done();
            });
    });
});

