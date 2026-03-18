(function(){
let translateObjs = {};
const trans = (...a) => {
    return translateObjs[a[0x0]] = a, '';
};
function regTextVar(a, b) {
    var c = ![];
    return d(b);
    function d(k, l) {
        switch (k['toLowerCase']()) {
        case 'title':
        case 'subtitle':
        case 'photo.title':
        case 'photo.description':
            var m = (function () {
                switch (k['toLowerCase']()) {
                case 'title':
                case 'photo.title':
                    return 'media.label';
                case 'subtitle':
                    return 'media.data.subtitle';
                case 'photo.description':
                    return 'media.data.description';
                }
            }());
            if (m)
                return function () {
                    var r, s, t = (l && l['viewerName'] ? this['getComponentByName'](l['viewerName']) : undefined) || this['getMainViewer']();
                    if (k['toLowerCase']()['startsWith']('photo'))
                        r = this['getByClassName']('PhotoAlbumPlayListItem')['filter'](function (v) {
                            var w = v['get']('player');
                            return w && w['get']('viewerArea') == t;
                        })['map'](function (v) {
                            return v['get']('media')['get']('playList');
                        });
                    else
                        r = this['_getPlayListsWithViewer'](t), s = j['bind'](this, t);
                    if (!c) {
                        for (var u = 0x0; u < r['length']; ++u) {
                            r[u]['bind']('changing', f, this);
                        }
                        c = !![];
                    }
                    return i['call'](this, r, m, s);
                };
            break;
        case 'tour.name':
        case 'tour.description':
            return function () {
                return this['get']('data')['tour']['locManager']['trans'](k);
            };
        default:
            if (k['toLowerCase']()['startsWith']('viewer.')) {
                var n = k['split']('.'), o = n[0x1];
                if (o) {
                    var p = n['slice'](0x2)['join']('.');
                    return d(p, { 'viewerName': o });
                }
            } else {
                if (k['toLowerCase']()['startsWith']('quiz.') && 'Quiz' in TDV) {
                    var q = undefined, m = (function () {
                            switch (k['toLowerCase']()) {
                            case 'quiz.questions.answered':
                                return TDV['Quiz']['PROPERTY']['QUESTIONS_ANSWERED'];
                            case 'quiz.question.count':
                                return TDV['Quiz']['PROPERTY']['QUESTION_COUNT'];
                            case 'quiz.items.found':
                                return TDV['Quiz']['PROPERTY']['ITEMS_FOUND'];
                            case 'quiz.item.count':
                                return TDV['Quiz']['PROPERTY']['ITEM_COUNT'];
                            case 'quiz.score':
                                return TDV['Quiz']['PROPERTY']['SCORE'];
                            case 'quiz.score.total':
                                return TDV['Quiz']['PROPERTY']['TOTAL_SCORE'];
                            case 'quiz.time.remaining':
                                return TDV['Quiz']['PROPERTY']['REMAINING_TIME'];
                            case 'quiz.time.elapsed':
                                return TDV['Quiz']['PROPERTY']['ELAPSED_TIME'];
                            case 'quiz.time.limit':
                                return TDV['Quiz']['PROPERTY']['TIME_LIMIT'];
                            case 'quiz.media.items.found':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_ITEMS_FOUND'];
                            case 'quiz.media.item.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_ITEM_COUNT'];
                            case 'quiz.media.questions.answered':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_QUESTIONS_ANSWERED'];
                            case 'quiz.media.question.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_QUESTION_COUNT'];
                            case 'quiz.media.score':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_SCORE'];
                            case 'quiz.media.score.total':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_TOTAL_SCORE'];
                            case 'quiz.media.index':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'];
                            case 'quiz.media.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_COUNT'];
                            case 'quiz.media.visited':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_VISITED_COUNT'];
                            default:
                                var s = /quiz\.([\w_]+)\.(.+)/['exec'](k);
                                if (s) {
                                    q = s[0x1];
                                    switch ('quiz.' + s[0x2]) {
                                    case 'quiz.score':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['SCORE'];
                                    case 'quiz.score.total':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['TOTAL_SCORE'];
                                    case 'quiz.media.items.found':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEMS_FOUND'];
                                    case 'quiz.media.item.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEM_COUNT'];
                                    case 'quiz.media.questions.answered':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_QUESTIONS_ANSWERED'];
                                    case 'quiz.media.question.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_QUESTION_COUNT'];
                                    case 'quiz.questions.answered':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTIONS_ANSWERED'];
                                    case 'quiz.question.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTION_COUNT'];
                                    case 'quiz.items.found':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEMS_FOUND'];
                                    case 'quiz.item.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEM_COUNT'];
                                    case 'quiz.media.score':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_SCORE'];
                                    case 'quiz.media.score.total':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_TOTAL_SCORE'];
                                    }
                                }
                            }
                        }());
                    if (m)
                        return function () {
                            var r = this['get']('data')['quiz'];
                            if (r) {
                                if (!c) {
                                    if (q != undefined) {
                                        if (q == 'global') {
                                            var s = this['get']('data')['quizConfig'], t = s['objectives'];
                                            for (var u = 0x0, v = t['length']; u < v; ++u) {
                                                r['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], h['call'](this, t[u]['id'], m), this);
                                            }
                                        } else
                                            r['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], h['call'](this, q, m), this);
                                    } else
                                        r['bind'](TDV['Quiz']['EVENT_PROPERTIES_CHANGE'], g['call'](this, m), this);
                                    c = !![];
                                }
                                try {
                                    var w = 0x0;
                                    if (q != undefined) {
                                        if (q == 'global') {
                                            var s = this['get']('data')['quizConfig'], t = s['objectives'];
                                            for (var u = 0x0, v = t['length']; u < v; ++u) {
                                                w += r['getObjective'](t[u]['id'], m);
                                            }
                                        } else
                                            w = r['getObjective'](q, m);
                                    } else {
                                        w = r['get'](m);
                                        if (m == TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'])
                                            w += 0x1;
                                    }
                                    return w;
                                } catch (x) {
                                    return undefined;
                                }
                            }
                        };
                }
            }
            break;
        }
        return function () {
            return '';
        };
    }
    function e() {
        var k = this['get']('data');
        k['updateText'](k['translateObjs'][a], a['split']('.')[0x0]);
        let l = a['split']('.'), m = l[0x0] + '_vr';
        m in this && k['updateText'](k['translateObjs'][a], m);
    }
    function f(k) {
        var l = k['data']['nextSelectedIndex'];
        if (l >= 0x0) {
            var m = k['source']['get']('items')[l], n = function () {
                    m['unbind']('begin', n, this), e['call'](this);
                };
            m['bind']('begin', n, this);
        }
    }
    function g(k) {
        return function (l) {
            k in l && e['call'](this);
        }['bind'](this);
    }
    function h(k, l) {
        return function (m, n) {
            k == m && l in n && e['call'](this);
        }['bind'](this);
    }
    function i(k, l, m) {
        for (var n = 0x0; n < k['length']; ++n) {
            var o = k[n], p = o['get']('selectedIndex');
            if (p >= 0x0) {
                var q = l['split']('.'), r = o['get']('items')[p];
                if (m !== undefined && !m['call'](this, r))
                    continue;
                for (var s = 0x0; s < q['length']; ++s) {
                    if (r == undefined)
                        return '';
                    r = 'get' in r ? r['get'](q[s]) : r[q[s]];
                }
                return r;
            }
        }
        return '';
    }
    function j(k, l) {
        var m = l['get']('player');
        return m !== undefined && m['get']('viewerArea') == k;
    }
}
var script = {"children":["this.MainViewer","this.WebFrame_1783C07A_01AD_83CB_4164_5B15D2F0A059","this.Container_0E721339_01AC_8549_4151_3CE659698A40","this.IconButton_11348816_01A4_835A_4161_A30EB05BE62E"],"downloadEnabled":true,"backgroundColorRatios":[0],"start":"this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_11348816_01A4_835A_4161_A30EB05BE62E], 'cardboardAvailable'); if(!this.get('fullscreenAvailable')) { [this.Button_0E720339_01AC_8549_4175_6632C568CCE8].forEach(function(component) { if(component.get('class') != 'ViewerArea') component.set('visible', false); }) }","id":"rootPlayer","data":{"textToSpeechConfig":{"pitch":1,"speechOnQuizQuestion":false,"rate":1,"speechOnInfoWindow":false,"stopBackgroundAudio":false,"speechOnTooltip":false,"volume":1},"defaultLocale":"pt","displayTooltipInTouchScreens":true,"history":{},"name":"Player435","locales":{"pt":"locale/pt.txt"}},"class":"Player","vrPolyfillScale":0.5,"layout":"absolute","minWidth":20,"minHeight":20,"backgroundColor":["#FFFFFF"],"scripts":{"executeAudioAction":TDV.Tour.Script.executeAudioAction,"getPlayListWithItem":TDV.Tour.Script.getPlayListWithItem,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"isComponentVisible":TDV.Tour.Script.isComponentVisible,"setMeasurementUnits":TDV.Tour.Script.setMeasurementUnits,"cleanSelectedMeasurements":TDV.Tour.Script.cleanSelectedMeasurements,"getPanoramaOverlaysByTags":TDV.Tour.Script.getPanoramaOverlaysByTags,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"executeAudioActionByTags":TDV.Tour.Script.executeAudioActionByTags,"clone":TDV.Tour.Script.clone,"_initSplitViewer":TDV.Tour.Script._initSplitViewer,"_initTwinsViewer":TDV.Tour.Script._initTwinsViewer,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"openLink":TDV.Tour.Script.openLink,"setMapLocation":TDV.Tour.Script.setMapLocation,"initQuiz":TDV.Tour.Script.initQuiz,"mixObject":TDV.Tour.Script.mixObject,"skip3DTransitionOnce":TDV.Tour.Script.skip3DTransitionOnce,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively,"shareSocial":TDV.Tour.Script.shareSocial,"executeJS":TDV.Tour.Script.executeJS,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"getPixels":TDV.Tour.Script.getPixels,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"enableVR":TDV.Tour.Script.enableVR,"getPlayListItems":TDV.Tour.Script.getPlayListItems,"isPanorama":TDV.Tour.Script.isPanorama,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"disableVR":TDV.Tour.Script.disableVR,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"getKey":TDV.Tour.Script.getKey,"getComponentByName":TDV.Tour.Script.getComponentByName,"changeOpacityWhilePlay":TDV.Tour.Script.changeOpacityWhilePlay,"takeScreenshot":TDV.Tour.Script.takeScreenshot,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"startPanoramaWithModel":TDV.Tour.Script.startPanoramaWithModel,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"restartTourWithoutInteraction":TDV.Tour.Script.restartTourWithoutInteraction,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"_getObjectsByTags":TDV.Tour.Script._getObjectsByTags,"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"getModel3DInnerObject":TDV.Tour.Script.getModel3DInnerObject,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"init":TDV.Tour.Script.init,"toggleTextToSpeechComponent":TDV.Tour.Script.toggleTextToSpeechComponent,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"getOverlays":TDV.Tour.Script.getOverlays,"textToSpeechComponent":TDV.Tour.Script.textToSpeechComponent,"_initItemWithComps":TDV.Tour.Script._initItemWithComps,"showPopupImage":TDV.Tour.Script.showPopupImage,"updateDeepLink":TDV.Tour.Script.updateDeepLink,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"getPlayListItemIndexByMedia":TDV.Tour.Script.getPlayListItemIndexByMedia,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"updateIndexGlobalZoomImage":TDV.Tour.Script.updateIndexGlobalZoomImage,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"unloadViewer":TDV.Tour.Script.unloadViewer,"quizPauseTimer":TDV.Tour.Script.quizPauseTimer,"toggleVR":TDV.Tour.Script.toggleVR,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"quizShowScore":TDV.Tour.Script.quizShowScore,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"getActivePlayersWithViewer":TDV.Tour.Script.getActivePlayersWithViewer,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"setOverlaysVisibility":TDV.Tour.Script.setOverlaysVisibility,"cloneBindings":TDV.Tour.Script.cloneBindings,"startMeasurement":TDV.Tour.Script.startMeasurement,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"createTween":TDV.Tour.Script.createTween,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"getAudioByTags":TDV.Tour.Script.getAudioByTags,"_initTTSTooltips":TDV.Tour.Script._initTTSTooltips,"getComponentsByTags":TDV.Tour.Script.getComponentsByTags,"setModel3DCameraSpot":TDV.Tour.Script.setModel3DCameraSpot,"quizResumeTimer":TDV.Tour.Script.quizResumeTimer,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"getQuizTotalObjectiveProperty":TDV.Tour.Script.getQuizTotalObjectiveProperty,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"getMediaByName":TDV.Tour.Script.getMediaByName,"quizFinish":TDV.Tour.Script.quizFinish,"clonePanoramaCamera":TDV.Tour.Script.clonePanoramaCamera,"quizStart":TDV.Tour.Script.quizStart,"setMeasurementsVisibility":TDV.Tour.Script.setMeasurementsVisibility,"getRootOverlay":TDV.Tour.Script.getRootOverlay,"getMediaByTags":TDV.Tour.Script.getMediaByTags,"setDirectionalPanoramaAudio":TDV.Tour.Script.setDirectionalPanoramaAudio,"resumePlayers":TDV.Tour.Script.resumePlayers,"setModel3DCameraWithCurrentSpot":TDV.Tour.Script.setModel3DCameraWithCurrentSpot,"setOverlaysVisibilityByTags":TDV.Tour.Script.setOverlaysVisibilityByTags,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"setModel3DCameraSequence":TDV.Tour.Script.setModel3DCameraSequence,"getStateTextToSpeech":TDV.Tour.Script.getStateTextToSpeech,"openEmbeddedPDF":TDV.Tour.Script.openEmbeddedPDF,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"setPlayListSelectedIndex":TDV.Tour.Script.setPlayListSelectedIndex,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"historyGoBack":TDV.Tour.Script.historyGoBack,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"unregisterKey":TDV.Tour.Script.unregisterKey,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"stopMeasurement":TDV.Tour.Script.stopMeasurement,"toggleMeasurement":TDV.Tour.Script.toggleMeasurement,"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"copyToClipboard":TDV.Tour.Script.copyToClipboard,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"historyGoForward":TDV.Tour.Script.historyGoForward,"setObjectsVisibility":TDV.Tour.Script.setObjectsVisibility,"getMediaWidth":TDV.Tour.Script.getMediaWidth,"playAudioList":TDV.Tour.Script.playAudioList,"cleanAllMeasurements":TDV.Tour.Script.cleanAllMeasurements,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"registerKey":TDV.Tour.Script.registerKey,"textToSpeech":TDV.Tour.Script.textToSpeech,"htmlToPlainText":TDV.Tour.Script.htmlToPlainText,"showWindowBase":TDV.Tour.Script.showWindowBase,"getOverlaysByGroupname":TDV.Tour.Script.getOverlaysByGroupname,"getOverlaysByTags":TDV.Tour.Script.getOverlaysByTags,"getMainViewer":TDV.Tour.Script.getMainViewer,"createTweenModel3D":TDV.Tour.Script.createTweenModel3D,"setObjectsVisibilityByID":TDV.Tour.Script.setObjectsVisibilityByID,"initAnalytics":TDV.Tour.Script.initAnalytics,"setObjectsVisibilityByTags":TDV.Tour.Script.setObjectsVisibilityByTags,"playGlobalAudioWhilePlayActiveMedia":TDV.Tour.Script.playGlobalAudioWhilePlayActiveMedia,"showWindow":TDV.Tour.Script.showWindow,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"translate":TDV.Tour.Script.translate,"sendAnalyticsData":TDV.Tour.Script.sendAnalyticsData,"initOverlayGroupRotationOnClick":TDV.Tour.Script.initOverlayGroupRotationOnClick,"downloadFile":TDV.Tour.Script.downloadFile,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"startModel3DWithCameraSpot":TDV.Tour.Script.startModel3DWithCameraSpot,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"setSurfaceSelectionHotspotMode":TDV.Tour.Script.setSurfaceSelectionHotspotMode,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"stopTextToSpeech":TDV.Tour.Script.stopTextToSpeech,"toggleMeasurementsVisibility":TDV.Tour.Script.toggleMeasurementsVisibility,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"setLocale":TDV.Tour.Script.setLocale,"existsKey":TDV.Tour.Script.existsKey,"setComponentsVisibilityByTags":TDV.Tour.Script.setComponentsVisibilityByTags,"setValue":TDV.Tour.Script.setValue,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay},"hash": "75a028fccd9f0569e45aa00c84e29f8851e236f70dc7b44d16c9602b80168149", "definitions": [{"hfov":360,"hfovMin":"120%","id":"panorama_F4BFE06A_FEF9_82BF_41EF_B86ECBEA5CA1","thumbnailUrl":"media/panorama_F4BFE06A_FEF9_82BF_41EF_B86ECBEA5CA1_t.jpg","data":{"label":"kris-guico-rsB-he-ye7w-unsplash.jpg"},"class":"Panorama","vfov":158.05,"hfovMax":130,"label":trans('panorama_F4BFE06A_FEF9_82BF_41EF_B86ECBEA5CA1.label'),"frames":[{"class":"CubicPanoramaFrame","cube":{"class":"ImageResource","levels":[{"colCount":36,"height":3072,"url":"media/panorama_F4BFE06A_FEF9_82BF_41EF_B86ECBEA5CA1_0/{face}/0/{row}_{column}.jpg","tags":"ondemand","class":"TiledImageResourceLevel","width":18432,"rowCount":6},{"colCount":18,"height":1536,"url":"media/panorama_F4BFE06A_FEF9_82BF_41EF_B86ECBEA5CA1_0/{face}/1/{row}_{column}.jpg","tags":"ondemand","class":"TiledImageResourceLevel","width":9216,"rowCount":3},{"colCount":12,"height":1024,"url":"media/panorama_F4BFE06A_FEF9_82BF_41EF_B86ECBEA5CA1_0/{face}/2/{row}_{column}.jpg","tags":"ondemand","class":"TiledImageResourceLevel","width":6144,"rowCount":2},{"colCount":6,"height":512,"url":"media/panorama_F4BFE06A_FEF9_82BF_41EF_B86ECBEA5CA1_0/{face}/3/{row}_{column}.jpg","tags":["ondemand","preload"],"class":"TiledImageResourceLevel","width":3072,"rowCount":1}]},"thumbnailUrl":"media/panorama_F4BFE06A_FEF9_82BF_41EF_B86ECBEA5CA1_t.jpg"}]},{"initialPosition":{"pitch":0,"class":"PanoramaCameraPosition","yaw":0},"class":"PanoramaCamera","initialSequence":{"class":"PanoramaCameraSequence","movements":[{"easing":"cubic_in","class":"DistancePanoramaCameraMovement","yawDelta":18.5,"yawSpeed":7.96},{"class":"DistancePanoramaCameraMovement","yawDelta":323,"yawSpeed":7.96},{"easing":"cubic_out","class":"DistancePanoramaCameraMovement","yawDelta":18.5,"yawSpeed":7.96}]},"id":"panorama_F4A30805_FEF9_8275_41EA_7F3A20C3567E_camera","enterPointingToHorizon":true},{"layout":"horizontal","backgroundColorRatios":[0],"iconWidth":30,"id":"Button_0E720339_01AC_8549_4175_6632C568CCE8","fontSize":12,"pressedIconHeight":30,"backgroundColor":["#F7931E"],"fontFamily":"Arial","minHeight":1,"data":{"name":"Button Settings Fullscreen"},"class":"Button","minWidth":1,"rollOverBackgroundColorRatios":[0],"iconURL":"skin/Button_0E720339_01AC_8549_4175_6632C568CCE8.png","iconHeight":30,"mode":"toggle","pressedIconURL":"skin/Button_0E720339_01AC_8549_4175_6632C568CCE8_pressed.png","paddingTop":0,"paddingLeft":0,"paddingBottom":0,"horizontalAlign":"center","rollOverBackgroundColor":["#CE6700"],"pressedIconWidth":30,"width":60,"paddingRight":0,"propagateClick":false,"verticalAlign":"middle","height":60,"borderColor":"#000000","fontColor":"#FFFFFF","rollOverBackgroundOpacity":1},{"progressBorderColor":"#000000","width":"100%","subtitlesTextShadowVerticalLength":1,"playbackBarHeadShadowHorizontalLength":0,"playbackBarHeadShadowVerticalLength":0,"toolTipPaddingLeft":6,"toolTipBackgroundColor":"#F6F6F6","subtitlesBottom":50,"progressBackgroundColor":["#FFFFFF"],"left":0,"progressBorderSize":0,"progressHeight":10,"playbackBarHeight":10,"toolTipPaddingTop":4,"progressBarBorderSize":0,"progressBarBorderRadius":0,"subtitlesTextShadowColor":"#000000","playbackBarProgressBorderSize":0,"playbackBarHeadWidth":6,"subtitlesTop":0,"playbackBarBackgroundColor":["#FFFFFF"],"progressBottom":0,"playbackBarBackgroundColorDirection":"vertical","toolTipPaddingBottom":4,"vrPointerColor":"#FFFFFF","subtitlesFontSize":"3vmin","playbackBarBottom":5,"toolTipShadowColor":"#333333","playbackBarRight":0,"progressBorderRadius":0,"playbackBarProgressBorderRadius":0,"playbackBarProgressBackgroundColor":["#3399FF"],"progressLeft":0,"subtitlesBackgroundOpacity":0.2,"propagateClick":false,"playbackBarHeadShadowOpacity":0.7,"subtitlesBorderColor":"#FFFFFF","playbackBarProgressBackgroundColorRatios":[0],"playbackBarBorderRadius":0,"playbackBarBorderColor":"#FFFFFF","playbackBarProgressBorderColor":"#000000","subtitlesFontFamily":"Arial","toolTipFontSize":"1.11vmin","playbackBarHeadBorderRadius":0,"data":{"name":"Main Viewer"},"surfaceReticleSelectionColor":"#FFFFFF","playbackBarHeadBorderColor":"#000000","id":"MainViewer","vrPointerSelectionColor":"#FF6600","surfaceReticleColor":"#FFFFFF","playbackBarBorderSize":0,"toolTipBorderColor":"#767676","class":"ViewerArea","vrPointerSelectionTime":2000,"minHeight":50,"subtitlesBackgroundColor":"#000000","minWidth":100,"subtitlesGap":0,"subtitlesTextShadowHorizontalLength":1,"toolTipFontColor":"#606060","playbackBarBackgroundOpacity":1,"progressBackgroundColorRatios":[0],"toolTipFontFamily":"Arial","toolTipPaddingRight":6,"playbackBarHeadShadowBlurRadius":3,"progressRight":0,"playbackBarLeft":0,"playbackBarHeadHeight":15,"toolTipTextShadowColor":"#000000","top":0,"progressBarBorderColor":"#000000","progressBarBackgroundColorRatios":[0],"playbackBarHeadShadowColor":"#000000","playbackBarHeadBorderSize":0,"playbackBarHeadBackgroundColorRatios":[0,1],"playbackBarHeadShadow":true,"firstTransitionDuration":0,"subtitlesTextShadowOpacity":1,"playbackBarHeadBackgroundColor":["#111111","#666666"],"subtitlesFontColor":"#FFFFFF","height":"100%","progressBarBackgroundColor":["#3399FF"]},{"id":"mainPlayList","items":[{"class":"PanoramaPlayListItem","media":"this.panorama_F58E942E_FEF9_82B7_41E3_7F5C6D29DC5D","player":"this.MainViewerPanoramaPlayer","camera":"this.panorama_F58E942E_FEF9_82B7_41E3_7F5C6D29DC5D_camera","begin":"this.setEndToItemIndex(this.mainPlayList, 0, 1)"},{"class":"PanoramaPlayListItem","media":"this.panorama_F4BFE06A_FEF9_82BF_41EF_B86ECBEA5CA1","player":"this.MainViewerPanoramaPlayer","camera":"this.panorama_F4BFE06A_FEF9_82BF_41EF_B86ECBEA5CA1_camera","begin":"this.setEndToItemIndex(this.mainPlayList, 1, 2)"},{"class":"PanoramaPlayListItem","media":"this.panorama_F4A30805_FEF9_8275_41EA_7F3A20C3567E","end":"this.trigger('tourEnded')","player":"this.MainViewerPanoramaPlayer","camera":"this.panorama_F4A30805_FEF9_8275_41EA_7F3A20C3567E_camera","begin":"this.setEndToItemIndex(this.mainPlayList, 2, 0)"}],"class":"PlayList"},{"buttonCardboardView":["this.IconButton_11348816_01A4_835A_4161_A30EB05BE62E"],"class":"PanoramaPlayer","displayPlaybackBar":true,"keepModel3DLoadedWithoutLocation":true,"arrowKeysAction":"translate","aaEnabled":true,"buttonToggleGyroscope":["this.Button_0E72B339_01AC_8549_4167_6B83862788B8"],"id":"MainViewerPanoramaPlayer","touchControlMode":"drag_rotation","viewerArea":"this.MainViewer"},{"closeButtonRollOverBackgroundColorRatios":[],"backgroundColorRatios":[],"titleFontSize":"1.29vmin","footerBorderSize":0,"closeButtonRollOverIconColor":"#FFFFFF","veilOpacity":0.4,"data":{"name":"Window8376"},"headerPaddingTop":10,"headerBorderSize":0,"bodyPaddingLeft":0,"closeButtonBackgroundColor":[],"veilColorDirection":"horizontal","closeButtonBorderColor":"#000000","closeButtonIconHeight":20,"headerVerticalAlign":"middle","closeButtonPaddingTop":0,"closeButtonRollOverBorderColor":"#000000","shadow":true,"shadowVerticalLength":0,"hideEffect":{"easing":"cubic_in_out","class":"FadeOutEffect","duration":500},"modal":true,"veilColorRatios":[0,1],"showEffect":{"easing":"cubic_in_out","class":"FadeInEffect","duration":500},"closeButtonIconWidth":20,"bodyBackgroundColorRatios":[0,0.5019607843137255,1],"bodyPaddingBottom":0,"headerBackgroundColor":["#DDDDDD","#EEEEEE","#FFFFFF"],"closeButtonBackgroundColorRatios":[],"footerBackgroundColorRatios":[0,0.8980392156862745,1],"propagateClick":false,"bodyPaddingTop":0,"headerBackgroundColorDirection":"vertical","footerBackgroundOpacity":0,"closeButtonPaddingRight":0,"gap":10,"bodyPaddingRight":0,"headerPaddingLeft":10,"verticalAlign":"middle","children":["this.WebFrame_16698B43_0241_DDB7_4176_7B724687DA5C"],"closeButtonIconColor":"#B2B2B2","scrollBarMargin":2,"closeButtonPressedBorderColor":"#000000","headerBackgroundOpacity":0,"closeButtonPressedBackgroundColor":[],"bodyBackgroundColorDirection":"vertical","closeButtonBorderRadius":11,"closeButtonPressedBackgroundColorRatios":[],"bodyBorderColor":"#000000","layout":"vertical","footerHeight":5,"titleFontFamily":"Arial","closeButtonRollOverBackgroundColor":[],"titlePaddingBottom":5,"id":"window_1155705A_0242_2C51_4148_45107BDE3418","footerBackgroundColor":["#FFFFFF","#EEEEEE","#DDDDDD"],"class":"Window","headerPaddingRight":0,"minHeight":0,"veilHideEffect":{"easing":"cubic_in_out","class":"FadeOutEffect","duration":500},"shadowSpread":1,"minWidth":0,"bodyBackgroundColor":["#FFFFFF","#DDDDDD","#FFFFFF"],"borderRadius":5,"closeButtonPressedBorderSize":0,"veilColor":["#000000","#000000"],"bodyBackgroundOpacity":0,"veilShowEffect":{"easing":"cubic_in_out","class":"FadeInEffect","duration":500},"backgroundColor":[],"headerBackgroundColorRatios":[0,0.09803921568627451,1],"closeButtonPressedIconLineWidth":3,"closeButtonRollOverBorderSize":0,"closeButtonPressedIconColor":"#FFFFFF","closeButtonBackgroundOpacity":0,"closeButtonBorderSize":0,"shadowHorizontalLength":3,"shadowColor":"#000000","horizontalAlign":"center","closeButtonPressedBackgroundOpacity":0,"bodyBorderSize":0,"footerBorderColor":"#000000","scrollBarColor":"#000000","headerPaddingBottom":5,"width":"90%","footerBackgroundColorDirection":"vertical","shadowOpacity":0.5,"titlePaddingRight":5,"closeButtonRollOverBackgroundOpacity":0,"closeButtonRollOverIconLineWidth":2,"closeButtonPaddingBottom":0,"titlePaddingLeft":5,"closeButtonIconLineWidth":2,"overflow":"scroll","headerBorderColor":"#000000","closeButtonPaddingLeft":0,"height":"90%","titlePaddingTop":5,"titleFontColor":"#000000","titleHorizontalAlign":"left"},{"layout":"horizontal","backgroundColorRatios":[0],"iconWidth":30,"id":"Button_0E72B339_01AC_8549_4167_6B83862788B8","fontSize":12,"data":{"name":"Button settings VR"},"backgroundColor":["#F7931E"],"fontFamily":"Arial","minHeight":1,"class":"Button","minWidth":1,"rollOverBackgroundColorRatios":[0],"iconURL":"skin/Button_0E72B339_01AC_8549_4167_6B83862788B8.png","iconHeight":30,"mode":"toggle","pressedIconURL":"skin/Button_0E72B339_01AC_8549_4167_6B83862788B8_pressed.png","paddingTop":0,"paddingLeft":0,"paddingBottom":0,"horizontalAlign":"center","rollOverBackgroundColor":["#CE6700"],"width":60,"paddingRight":0,"propagateClick":false,"verticalAlign":"middle","height":60,"borderColor":"#000000","fontColor":"#FFFFFF","rollOverBackgroundOpacity":1},{"backgroundColorRatios":[0],"id":"WebFrame_1783C07A_01AD_83CB_4164_5B15D2F0A059","left":"16.71%","class":"WebFrame","data":{"name":"WebFrame19573"},"backgroundColor":["#FFFFFF"],"minWidth":1,"minHeight":1,"url":trans('WebFrame_1783C07A_01AD_83CB_4164_5B15D2F0A059.url'),"top":"22.05%","width":"22.678%","height":"23.153%","visible":false},{"hfov":360,"hfovMin":"135%","id":"panorama_F58E942E_FEF9_82B7_41E3_7F5C6D29DC5D","thumbnailUrl":"media/panorama_F58E942E_FEF9_82B7_41E3_7F5C6D29DC5D_t.jpg","data":{"label":"allphoto-bangkok-imSqK_PD5R0-unsplash.jpg"},"class":"Panorama","vfov":120.66,"overlays":["this.overlay_12AEC9B8_0246_7CD1_417C_0ACCB62AB2E2","this.overlay_13F51248_0242_EFB1_4147_331D85361690","this.overlay_109D2EA8_0242_34F1_4166_8F7819F48AF0"],"hfovMax":130,"label":trans('panorama_F58E942E_FEF9_82B7_41E3_7F5C6D29DC5D.label'),"frames":[{"class":"CubicPanoramaFrame","cube":{"class":"ImageResource","levels":[{"colCount":36,"height":3072,"url":"media/panorama_F58E942E_FEF9_82B7_41E3_7F5C6D29DC5D_0/{face}/0/{row}_{column}.jpg","tags":"ondemand","class":"TiledImageResourceLevel","width":18432,"rowCount":6},{"colCount":18,"height":1536,"url":"media/panorama_F58E942E_FEF9_82B7_41E3_7F5C6D29DC5D_0/{face}/1/{row}_{column}.jpg","tags":"ondemand","class":"TiledImageResourceLevel","width":9216,"rowCount":3},{"colCount":12,"height":1024,"url":"media/panorama_F58E942E_FEF9_82B7_41E3_7F5C6D29DC5D_0/{face}/2/{row}_{column}.jpg","tags":"ondemand","class":"TiledImageResourceLevel","width":6144,"rowCount":2},{"colCount":6,"height":512,"url":"media/panorama_F58E942E_FEF9_82B7_41E3_7F5C6D29DC5D_0/{face}/3/{row}_{column}.jpg","tags":["ondemand","preload"],"class":"TiledImageResourceLevel","width":3072,"rowCount":1}]},"thumbnailUrl":"media/panorama_F58E942E_FEF9_82B7_41E3_7F5C6D29DC5D_t.jpg"}]},{"initialPosition":{"pitch":1.91,"class":"PanoramaCameraPosition","yaw":-68.9},"class":"PanoramaCamera","initialSequence":{"class":"PanoramaCameraSequence","movements":[{"easing":"cubic_in","class":"DistancePanoramaCameraMovement","yawDelta":18.5,"yawSpeed":7.96},{"class":"DistancePanoramaCameraMovement","yawDelta":323,"yawSpeed":7.96},{"easing":"cubic_out","class":"DistancePanoramaCameraMovement","yawDelta":18.5,"yawSpeed":7.96}]},"id":"panorama_F58E942E_FEF9_82B7_41E3_7F5C6D29DC5D_camera","enterPointingToHorizon":true},{"backgroundOpacity":0,"maxHeight":42,"id":"IconButton_11348816_01A4_835A_4161_A30EB05BE62E","left":"2.47%","class":"IconButton","minHeight":1,"data":{"name":"IconButton6362","visibleIfCardboardAvailable":true},"minWidth":1,"maxWidth":42,"iconURL":"skin/IconButton_11348816_01A4_835A_4161_A30EB05BE62E.png","top":"3.64%","horizontalAlign":"center","width":42,"propagateClick":false,"verticalAlign":"middle","height":42},{"hfov":360,"hfovMin":"150%","id":"panorama_F4A30805_FEF9_8275_41EA_7F3A20C3567E","thumbnailUrl":"media/panorama_F4A30805_FEF9_8275_41EA_7F3A20C3567E_t.jpg","data":{"label":"timothy-oldfield-luufnHoChRU-unsplash.jpg"},"class":"Panorama","vfov":180,"hfovMax":130,"label":trans('panorama_F4A30805_FEF9_8275_41EA_7F3A20C3567E.label'),"frames":[{"class":"CubicPanoramaFrame","cube":{"class":"ImageResource","levels":[{"colCount":24,"height":2048,"url":"media/panorama_F4A30805_FEF9_8275_41EA_7F3A20C3567E_0/{face}/0/{row}_{column}.jpg","tags":"ondemand","class":"TiledImageResourceLevel","width":12288,"rowCount":4},{"colCount":12,"height":1024,"url":"media/panorama_F4A30805_FEF9_8275_41EA_7F3A20C3567E_0/{face}/1/{row}_{column}.jpg","tags":"ondemand","class":"TiledImageResourceLevel","width":6144,"rowCount":2},{"colCount":6,"height":512,"url":"media/panorama_F4A30805_FEF9_8275_41EA_7F3A20C3567E_0/{face}/2/{row}_{column}.jpg","tags":["ondemand","preload"],"class":"TiledImageResourceLevel","width":3072,"rowCount":1}]},"thumbnailUrl":"media/panorama_F4A30805_FEF9_8275_41EA_7F3A20C3567E_t.jpg"}]},{"children":["this.Button_0E72B339_01AC_8549_4167_6B83862788B8","this.Button_0E720339_01AC_8549_4175_6632C568CCE8"],"overflow":"scroll","backgroundColorRatios":[0.0196078431372549],"id":"Container_0E721339_01AC_8549_4151_3CE659698A40","data":{"name":"-button set"},"minHeight":1,"class":"Container","minWidth":1,"right":15,"backgroundColor":["#F7931E"],"layout":"vertical","top":"5.62%","horizontalAlign":"center","width":60,"propagateClick":false,"height":129,"scrollBarColor":"#000000","verticalAlign":"middle","scrollBarMargin":2},{"initialPosition":{"pitch":0,"class":"PanoramaCameraPosition","yaw":0},"class":"PanoramaCamera","initialSequence":{"class":"PanoramaCameraSequence","movements":[{"easing":"cubic_in","class":"DistancePanoramaCameraMovement","yawDelta":18.5,"yawSpeed":7.96},{"class":"DistancePanoramaCameraMovement","yawDelta":323,"yawSpeed":7.96},{"easing":"cubic_out","class":"DistancePanoramaCameraMovement","yawDelta":18.5,"yawSpeed":7.96}]},"id":"panorama_F4BFE06A_FEF9_82BF_41EF_B86ECBEA5CA1_camera","enterPointingToHorizon":true},{"backgroundColorRatios":[],"id":"WebFrame_16698B43_0241_DDB7_4176_7B724687DA5C","data":{"name":"WebFrame10669"},"class":"WebFrame","minWidth":0,"minHeight":0,"backgroundColor":[],"url":trans('WebFrame_16698B43_0241_DDB7_4176_7B724687DA5C.url'),"width":"100%","propagateClick":false,"height":"100%"},{"id":"overlay_12AEC9B8_0246_7CD1_417C_0ACCB62AB2E2","class":"FramePanoramaOverlay","yaw":-41.54,"contentInteractive":true,"pitch":-0.2,"height":720,"hfov":33.63,"url":trans('overlay_12AEC9B8_0246_7CD1_417C_0ACCB62AB2E2.url'),"vfov":27.14,"data":{"label":"Web"},"width":1280},{"rollOverDisplay":true,"class":"HotspotPanoramaOverlay","maps":[],"areas":["this.HotspotPanoramaOverlayArea_13B5225B_0242_EC57_4182_8994BCF5E139"],"enabledInVR":true,"items":[{"pitch":0.57,"class":"HotspotPanoramaOverlayImage","yaw":3.27,"data":{"label":"Info 01"},"scaleMode":"fit_inside","hfov":10.5,"distance":100,"vfov":10.5,"image":"this.AnimatedImageResource_166BEA78_0241_DC51_417D_A985AB4B58C7"}],"enabledInStandard":false,"data":{"label":"Info 01"},"useHandCursor":true,"id":"overlay_13F51248_0242_EFB1_4147_331D85361690"},{"rollOverDisplay":true,"class":"HotspotPanoramaOverlay","maps":[],"areas":["this.HotspotPanoramaOverlayArea_108B1EB1_0242_34D3_4181_5952338FC146"],"enabledInVR":true,"items":[{"pitch":-28.53,"class":"HotspotPanoramaOverlayImage","yaw":-9.66,"data":{"label":"Info 01"},"scaleMode":"fit_inside","hfov":10.5,"distance":100,"vfov":10.5,"image":"this.AnimatedImageResource_166BBA79_0241_DC53_413A_7779F55A5566"}],"enabledInStandard":false,"data":{"label":"Info 01"},"useHandCursor":true,"id":"overlay_109D2EA8_0242_34F1_4166_8F7819F48AF0"},{"class":"HotspotPanoramaOverlayArea","mapColor":"any","displayTooltipInTouchScreens":true,"id":"HotspotPanoramaOverlayArea_13B5225B_0242_EC57_4182_8994BCF5E139","click":"this.WebFrame_16698B43_0241_DDB7_4176_7B724687DA5C.set('url', this.translate('PopupWebFrameBehaviour_1153B05B_0242_2C57_4160_9987A866CAE1.url')); this.showWindowBase(this.window_1155705A_0242_2C51_4148_45107BDE3418, null, true)"},{"class":"AnimatedImageResource","colCount":4,"frameDuration":41,"levels":[{"height":690,"url":"media/res_1679BCF2_027E_5451_4181_3A556F10C1CE_0.png","class":"ImageResourceLevel","width":460}],"frameCount":22,"id":"AnimatedImageResource_166BEA78_0241_DC51_417D_A985AB4B58C7","finalFrame":"first","rowCount":6},{"class":"HotspotPanoramaOverlayArea","mapColor":"any","displayTooltipInTouchScreens":true,"id":"HotspotPanoramaOverlayArea_108B1EB1_0242_34D3_4181_5952338FC146","click":"try{eval('var old = document.getElementById(\"customFormBox\");if (old) {  old.remove();}var box = document.createElement(\"div\");box.id = \"customFormBox\";box.style.position = \"fixed\";box.style.top = \"20%\";box.style.left = \"25%\";box.style.width = \"50%\";box.style.height = \"55%\";box.style.background = \"#fff\";box.style.borderRadius = \"16px\";box.style.boxShadow = \"0 10px 30px rgba(0,0,0,0.25)\";box.style.overflow = \"hidden\";box.style.zIndex = \"99999\";var close = document.createElement(\"button\");close.innerHTML = \"X\";close.style.position = \"absolute\";close.style.top = \"10px\";close.style.right = \"10px\";close.style.zIndex = \"100000\";close.style.border = \"none\";close.style.background = \"rgba(0,0,0,0.7)\";close.style.color = \"#fff\";close.style.borderRadius = \"8px\";close.style.padding = \"8px 12px\";close.style.cursor = \"pointer\";close.onclick = function () {  box.remove();};var iframe = document.createElement(\"iframe\");iframe.src = \"https://webtour-plum.vercel.app/form/\";iframe.style.width = \"100%\";iframe.style.height = \"100%\";iframe.style.border = \"none\";box.appendChild(close);box.appendChild(iframe);document.body.appendChild(box);')}catch(e){console.log(e)}"},{"class":"AnimatedImageResource","colCount":4,"frameDuration":41,"levels":[{"height":690,"url":"media/res_1679BCF2_027E_5451_4181_3A556F10C1CE_0.png","class":"ImageResourceLevel","width":460}],"frameCount":22,"id":"AnimatedImageResource_166BBA79_0241_DC53_413A_7779F55A5566","finalFrame":"first","rowCount":6}],"defaultMenu":["fullscreen","mute","rotation"],"buttonToggleFullscreen":["this.Button_0E720339_01AC_8549_4175_6632C568CCE8"],"propagateClick":false,"width":"100%","scrollBarColor":"#000000","xrPanelsEnabled":true,"height":"100%","gap":10,"scrollBarMargin":2};
if (script['data'] == undefined)
    script['data'] = {};
script['data']['translateObjs'] = translateObjs, script['data']['createQuizConfig'] = function () {
    let a = {}, b = this['get']('data')['translateObjs'];
    for (const c in translateObjs) {
        if (!b['hasOwnProperty'](c))
            b[c] = translateObjs[c];
    }
    return a;
}, TDV['PlayerAPI']['defineScript'](script);
//# sourceMappingURL=script_device.js.map
})();
//Generated with v2026.0.4, Wed Mar 18 2026